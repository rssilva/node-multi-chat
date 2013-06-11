var Chat = function () {
	return {
		init: function () {
			this.users = [];
			this.usersCounter = 0;

			this.setEvents();
		},

		addUser: function ( options ) {
			var index = options.index;

			for (var i in options) {
				if ( this.users[index] ) {
					this.users[index][i] = options[i];
				} else {
					this.users[index] = {};
					this.users[index][i] = options[i];
				}
			}
		},

		getUsers: function () {
			return this.users;
		},

		streamMessage: function ( message ) {
			for ( var index in this.users ) {
				this.users[index].sendMessage( message );
			}
		},

		setEvents: function () {

		}
	}
}

module.exports = Chat;