var webSocketServer = require('websocket').server;

var WebSocket = function () {
	return {
		init: function () {

		},

		buildWebSocketServer: function ( server ) {
			this.webSocketServer = new webSocketServer({
				httpServer: server
			});

			this.config();

			return this.webSocketServer;
		},

		config: function () {
			this.setEvents();			
		},

		setEvents: function () {
			var self = this;

			this.webSocketServer.on( 'request', function ( request ) {
				self.onRequest( request );
			});
		},

		onRequest: function ( request ) {
			var self = this,
				connection = request.accept( null, request.origin );

		    var data = {
		    	connection: connection
		    }

		    global.eventEmitter.emit( 'userEntered', request, data );
		}
	}
}

module.exports = new WebSocket();