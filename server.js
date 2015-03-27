#!/usr/bin/env node
'use strict';

var http = require('http');

http.createServer(function(req, res) {
  console.log('request event callback');
  res.writeHead('200', {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World!');
}).listen({
  fd: 3
}, function() {
  console.log('Server bound to file descriptor');
});
