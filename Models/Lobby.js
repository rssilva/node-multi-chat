var User = require( '../Models/User.js' )

var Lobby = function () {
	return {
		init: function () {
			this.users = [];
			this.usersCounter = 0;

			this.setEvents();
		},

		addUser: function ( data ) {
			var self = this,
				index = this.usersCounter;

			data.index = index;

			this.users[index] = new User( data );
			this.users[index].init();

			this.users[index].getAllUsers = function ( userIndex ) {
				return self.getUsers( userIndex );
			}
			
			this.usersCounter++;
		},

		setUserData: function ( index, data ) {
			for ( var i in data ) {
				this.users[index][i] = data[i];
			}
		},

		getUsers: function ( index ) {
			var users = {};

			for ( var i in this.users ) {

				users[i] = {name: this.users[i].name};

				if ( i != index ) {
				}
			}

			return users;
		},

		onNewUser: function ( index, data ) {
			
			var users = this.getUsers();
			
			for ( var i in this.users ) {
				if ( i == index ) {
					this.users[i].sendLobbyUsersList( users );
				} else {
					this.users[i].sendNewUserToLobby( index, data );
				}
			}
		},

		removeUser: function ( index ) {
			delete this.users[index];

			var users = this.getUsers();
			
			for ( var i in this.users ) {
				this.users[i].removeUserFromLobbyList( index );
			}
		},

		setEvents: function () {
			var self = this;

			global.eventEmitter.on( 'userEntered', function ( request, data ) {
				self.addUser( data );
			});

			global.eventEmitter.on( 'userExit', function ( index ) {
				self.removeUser( index );
			})

			global.eventEmitter.on( 'userInitialMessage', function ( index, data ) {
				self.setUserData( index, data );
				self.onNewUser( index, data )
			})
		}
	}
}

var lobby = new Lobby()
lobby.init();

module.exports = lobby;