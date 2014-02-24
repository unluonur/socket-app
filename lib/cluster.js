var path = require('path');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

cluster.setupMaster({
  exec: path.join(__dirname, 'app.js')
});

for (var i = 0; i < numCPUs; i++) {
  cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
  console.log('worker ' + worker.process.pid + ' died');
});
