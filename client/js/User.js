var User = function ( options ) {
	return {
		init: function () {
			this.options = options;
			this.setConnection();
		},

		setData: function () {

		},

		setConnection: function () {
			var self = this;

		    if (!window.WebSocket) {
		        console.log('O seu browser falhou com voce e nao pode abrir essa conexao');
		 
		        return null;
		    }
		 
		    this.connection = new WebSocket('ws://192.168.2.101:1337');
		    
		    this.connection.onopen = function () {
		        self.sendData({
		            messageType: 'opening',
		            name: 'user_' + Math.round( Math.random() * 1000000 )
		        })
		    };

		    this.connection.onerror = function (error) {
		        console.log('Erro na conexao');
		    };
		 
		    this.connection.onmessage = function (message) {
		    
		        try {
		            var json = JSON.parse(message.data);
		        } catch (e) {
		            console.log('This doesn\'t look like a valid JSON: ', message.data);
		            return;
		        }
		 
		        console.log('from server', json)
		        self.handleMessage( json )
		    };

		    this.connection.onclose = function (message) {
		        self.sendData({
		        	messageType: 'closing',
		        	name: 'ISILDUR'
		        })
		    };
		},

		sendData: function ( data ) {
			if (this.connection !== null) {
				this.connection.send( JSON.stringify(data) );
			}
		},

		handleMessage: function ( message ) {
			if ( message.lobbyUsersList ) {
				this.options.populateLobbyDash( message.lobbyUsersList )
			} else if ( message.newUser ) {
				this.options.addNewUserOnLobbyDash( message )
			} else if ( message.removeUser ) {
				this.options.removeUserFromLobby( message.index )
			}
		},
	}
}