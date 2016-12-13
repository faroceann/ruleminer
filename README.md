## Overview

ruleminer is an API that performs association rule learning on any dataset in CSV file format. This API provides a [single endpoint](#post-mine-csv) that accepts a CSV file and returns rules generated in JSON format. Association rule discovery can be useful for market basket analysis, user behavior analysis, or even fraud detection.

ruleminer uses the Apriori algorithm. It identifies frequent itemsets that meet the user-specified minimum support threshold and applies the minimum confidence constraint to the frequent itemset to form association rules. Due credit to [asaini](https://github.com/asaini/Apriori) for creating the Python implementation of Apriori used in this project. 

## System Dependencies
* Python3
* ZeroRPC: used to facilitate communication between Node.js and Python3 in a service-oriented architecture. Due credit to Ian Hindsdale for making the initial [guide on communicating between Node.js and Python using ZeroRPC](https://ianhinsdale.com/post/communicating-between-nodejs-and-python/).
   * libevent 
   * ZeroMQ
   * pyzmq
* Node.js


## Installation

##### Install via git clone with system dependencies using Homebrew on Mac OS
```bash
# First install ZeroMQ
brew install zeromq

# Next install libevent, an event notification library required by zerorpc
brew install libevent

# Now install pyzmq: Python bindings for ZeroMQ
pip install pyzmq

# Now we can install ZeroRPC
pip install zerorpc

# Clone the repo
$ git clone https://github.com/maxhammad/ruleminer.git
$ cd ruleminer
$ npm install
```


##### Install via git clone with system dependencies on Ubuntu 
```bash
#!/bin/bash

# Simple script for installing ZeroRPC on Ubuntu 12.04 LTS
# https://ianhinsdale.com/post/communicating-between-nodejs-and-python/

# First install ZeroMQ
sudo apt-get install libzmq-dev

# Next install libevent, an event notification library required by zerorpc
sudo apt-get install libevent

# Python dependencies

# Now install pyzmq: Python bindings for ZeroMQ
# If you don't already have pip installed:
sudo apt-get install python-setuptools
sudo apt-get install python-pip
sudo pip install pyzmq

# Now we can install ZeroRPC
sudo pip install zerorpc

# Clone the repo
$ git clone https://github.com/maxhammad/ruleminer.git
$ cd ruleminer
$ npm install
```

##### Install via git clone

```bash
$ git clone https://github.com/maxhammad/ruleminer.git
$ cd ruleminer
$ npm install
```

## Endpoints
##### POST /mine-csv
Expects multipart form data that includes ```csv``` of content type ```text/csv```, and  ```minSupport``` and ```minConfidence``` values. Note that ```minSupport``` and ```minConfidence``` must each be a float value between 0 - 1 (inclusive). According to @asaini, best results are obtained with a ```minConfidence``` of ```0.6```, and ```minSupport``` of ```0.15```. 

## CSV Data Formatting Expectations
Each tuple in your CSV should be an itemset in the form of ```item a, item b, item c```. Items in itemsets are expected to be comma delimited, and itemsets should be delimited by newlines. Numerical data isn't very useful for association rule learning, so you should consider discretizing it. The CSV is not expected to contain a header row.

## License (MIT)

Copyright © 2016 Max Hammad

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


