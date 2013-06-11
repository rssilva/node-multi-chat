var User = function ( data ) {
	return {
		init: function () {
			this.data = data;

			this.setConnectionEvents()
		},

		sendData: function ( message ) {
			this.data.connection.sendUTF( JSON.stringify( message ) );
		},

		firstMessage: function ( messageContent ) {
			
			this.name = messageContent.name;

			this.sendData({
				index: this.data.index,
				name: this.name,
				messageType: 'setUserData'
			});

			global.eventEmitter.emit( 'userInitialMessage', this.data.index, {
				name: this.name
			})
		},

		onMessage: function ( message ) {
			// console.log(message)
			if ( message.type === 'utf8' && message.utf8Data ) {
				
				var messageContent = JSON.parse( message.utf8Data )

				if ( messageContent.messageType == 'opening' ) {

					this.firstMessage( messageContent )
				} else if ( messageContent.messageType == 'stream' ) {

					this.stream( index, message );
				}
			}
		},

		sendLobbyUsersList: function ( usersList ) {
			var users = [],
				usersList = this.getAllUsers();
			
			for ( var i in usersList ) {
				if ( i != this.data.index ) {
					users[i] = {userData: usersList[i], index: i};
				}
			}

			this.sendData( {lobbyUsersList: users} );
		},

		sendNewUserToLobby: function ( index, data ) {
			this.sendData( {newUser: data, index: index} );
		},

		removeUserFromLobbyList: function ( index ) {
			this.sendData( {removeUser: {}, index: index} );
		},

		onClose: function ( index ) {
			global.eventEmitter.emit( 'userExit', index );
		},

		setConnectionEvents: function () {
			var self = this;
			
			this.data.connection.on( 'message', function ( message ) {
				self.onMessage( message )
			});
			
			this.data.connection.on( 'close', function ( webSocketConnection, closeReason, description ) {
				self.onClose( self.data.index )
			});
		}
	}
}

module.exports = User;