var cluster = require('cluster');
var config = require('./config.json');
var numCPUs = require('os').cpus().length;

cluster.setupMaster({
  exec: 'app.js'
});

for (var i = 0; i < numCPUs; i++) {
  cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
  console.log('worker ' + worker.process.pid + ' died');
});

