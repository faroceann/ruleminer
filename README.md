## Overview

Perform association rule learning using the Apriori algorithm on CSV file uploads. This API provides a POST endpoint that accepts form data with a CSV file, minimum support, and minimum confidence thresholds and responds with association rules. 

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
$ git clone https://github.com/maxhammad/node-express-assocation-rule-learning-api.git
$ cd assocation-rule-learning-api
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
$ git clone https://github.com/maxhammad/node-express-assocation-rule-learning-api.git
$ cd assocation-rule-learning-api
$ npm install
```

##### Install via git clone

```bash
$ git clone https://github.com/maxhammad/node-express-assocation-rule-learning-api.git
$ cd assocation-rule-learning-api
$ npm install
```

## Endpoints
##### POST /mine-csv
Expects multipart form data that includes ```csv``` of content type ```text/csv```, and  ```minSupport``` and ```minConfidence``` values. Note that ```minSupport``` and ```minConfidence``` must each be a float value between 0 - 1 (inclusive). According to @asaini, best results are obtained with a ```minConfidence``` of ```0.6```, and ```minSupport``` of ```0.15```. 

## CSV Data Formatting Expectations
Each tuple in your CSV should be an itemset in the form of ```item a, item b, item c```. Items in itemsets are expected to be comma delimited, and itemsets should be delimited by newlines. Numerical data isn't very useful for association rule learning, so you should consider discretizing it. The CSV is not expected to contain a header row.

