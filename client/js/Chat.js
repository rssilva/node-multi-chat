var Chat = function ( options ) {
	return {
		init: function () {
			this.options = options;
			this.users = {};
		},

		addUser: function ( index ) {
			this.users[index] = {};
		}
	}
}