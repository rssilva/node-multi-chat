var Config = require( '../config.js' ),
	nodeStatic = require('node-static'),
	fileServer = new nodeStatic.Server(),
	port = Config.socketPort;

var server = require('http').createServer( function(request, response) {
	request.addListener( 'end', function () {
        fileServer.serve(request, response);
    });
});

server.listen( port, function() {
    console.log( ' Node running at ' + port );
});

module.exports.server = server;
module.exports.fileServer = fileServer;

var WebSocket = require( Config.routes.WsServer );

// module.exports.WsServer = new webSocketServer({
// 	httpServer: server
// });


module.exports.WsServer = WebSocket.buildWebSocketServer(server);