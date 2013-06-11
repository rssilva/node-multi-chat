var Chat = function ( options ) {
	return {
		init: function () {
			this.options = options;
			this.users = {};
			this.user = {};
			this.chatContainer = $('.chat-container')
			this.getTemplate()
		},

		addUser: function ( options ) {
			var index = options.index;

			for ( var i in options ) {
				this.user[i] = options[i];
			}
		},

		getTemplate: function () {
			var self = this;

			$.ajax({
				dataType: 'html',
				url: 'client/templates/chat.html',
				success: function ( data ) {
					
					self.attachTemplate( data )
				},
				error: function ( ) {
					console.log('error')
				}
			})
		},

		attachTemplate: function ( data ) {
			var template = $(data);

			template.attr( 'id', this.options.id );
			this.chatContainer.append( template );

			this.bindEvents( template )
		},

		bindEvents: function ( template ) {
			var self = this;

			template.find('textarea').on('keydown', function (ev) {
				if ( ev.keyCode && ev.keyCode == 13 ) {
					
					self.sendMessage({
						messageType: 'stream',
						chatId: self.options.id,
						message: this.value
					})
				}
			});
		},

		sendMessage: function ( data ) {
			
			this.user.sendMessage( data );
			
		}
	}
}