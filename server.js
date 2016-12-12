var 
  zerorpc = require('zerorpc'),
  express = require('express'),
  fs = require('fs'),
  spawn = require('child_process').spawn,
  bodyParser = require('body-parser'),
  multer = require('multer'),
  mime = require('mime'),
  crypto = require('crypto'),
  pyshell = require('python-shell'),
  app = express(),
  cleanup = require('node-cleanup'),
  port = process.env.PORT || 3030;

var spawner;
function run(arg1, arg2, callback) {
  spawner = spawn(arg1, arg2);
  var result = '';
  spawner.stdout.on('data', function(data) {
    result += data.toString();
  });
  spawner.on('close', function(code) {
    return callback(result);
  });
}
run('python3', ['rpc.py'], function(result) { console.log(result) });
// release resources here before node exits 
cleanup(function () {
  spawner.kill();
});
// connect to zero RPC client
var client = new zerorpc.Client();
client.connect('tcp://127.0.0.1:4242');

app.use(bodyParser.json());
// static routes
app.use(express.static('app'));
// multer config
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/assets/uploads/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      if (err) {
        console.log(err);
      }
    });
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1000 * 1000
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'text/csv') {
      req.fileValidationError = 'incorrect mimetype';
      return cb(null, false, new Error('incorrect mimetype'));
    }
    cb(null, true);
  }
});

var mineCsv = {
  runApriori: function(filePath, minSupport, minConfidence) {
    var that = this;
    return new Promise((resolve, reject) => {
      client.invoke('runApriori', filePath, minSupport, minConfidence, function (error, res, more) {
        that.deleteUpload(filePath)
        resolve(res);
        if (error)
          reject(error);
      });
    });
  },
  deleteUpload: function(filePath) {
    fs.unlink(filePath);
  }
}

app.post('/mine-csv', upload.single('csv'), function (req, res, next) {
  mineCsv.runApriori('app/assets/uploads/' + req.file.filename, req.body.minSupport, req.body.minConfidence).then(function(response) {
    res.status(200).send(response);
  })
  .catch(function (error) {
    res.status(400).send(error)
  });
});

app.listen(port);
console.log('App listening on port ', port);
