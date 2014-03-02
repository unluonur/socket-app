var http = require('http');

module.exports = function(config) {
	var server = http.createServer();
	var sio = require('socket.io');
	var io = require('socket.io').listen(server);

	var RedisStore = require('socket.io/lib/stores/redis');
	var redis = require('socket.io/node_modules/redis');


	io.set('store', new RedisStore({
		redisPub: redis.createClient(config.redisPub),
		redisSub: redis.createClient(config.redisSub),
		redisClient: redis.createClient(config.redisClient)
	}));

	io.sockets.on('connection', function(socket) {
		socket.emit('data', 'connected to worker: ' + cluster.worker.id);
	});



	server.listen(config.port);
	
};
