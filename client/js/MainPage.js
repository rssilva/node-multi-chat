var connection = null;
 
window.onload = function () {
    var mainPage = new MainPage();
    mainPage.init()

    var user = new User({
        populateLobbyDash: function ( usersList ) {
            mainPage.populateLobbyDash( usersList );
        },
        addNewUserOnLobbyDash: function ( userData ) {
            mainPage.addNewUserOnLobbyDash( userData )
        },
        removeUserFromLobby: function ( index ) {
            mainPage.removeUserFromLobby( index )
        },
        onChatMessage: function ( data ) {
            mainPage.onChatMessage( data )
        }
    });
    user.init();

    mainPage.lobbyChat.addUser({
        sendMessage: function ( data ) {
            data.index = user.getIndex();
            user.sendData( data )
        }
    })
}

var MainPage = function () {
    return {
        init: function () {
            this.lobbyDash = $('.main-user-dashboard');
            this.addLobbyChat();
            this.users = {};
        },

        populateLobbyDash: function ( usersList ) {
            var ul = document.createElement('ul'),
                li;

            for ( var i = 0, len = usersList.length; i < len; i++ ) {
                
                if ( usersList[i] ) {
                    // this.lobbyChat.addUser( i );

                    li = this.buildUserElement( usersList[i].userData );
                    li.className = 'index-' + i;

                    this.setOnUserArray( i, {
                        data: usersList[i].userData,
                        elem: li
                    });

                    ul.appendChild( li );
                }
            }
            
            this.lobbyDash.find('ul.main-user-list').html( ul.children );
        },

        addNewUserOnLobbyDash: function ( data ) {
            var li = this.buildUserElement( data.newUser );
            li.className = 'index-' + data.index;
            
            this.setOnUserArray( data.index, {
                data: data.newUser,
                elem: li
            });

            this.lobbyDash.find('ul.main-user-list').append( li );
        },

        removeUserFromLobby: function ( index ) {
            delete this.users[index];
            
            this.lobbyDash.find( 'li.index-' + index ).remove();
        },

        buildUserElement: function ( userData ) {
            var li = document.createElement('li'),
                a = document.createElement('a');

            li.appendChild( a )
            a.innerText = userData.name;
            a.href="javascript:;"

            return li;
        },

        setOnUserArray: function ( index, obj ) {
            if ( !this.users[index] ) {
                this.users[index] = {};
            }

            for ( var i in obj ) {
                this.users[index][i] = obj[i];
            }
        },

        onChatMessage: function ( data ) {
            
        },

        addLobbyChat: function () {
            var self = this;

            this.lobbyChat = new Chat({
                id: 'lobbychat'
            });

            this.lobbyChat.init();
        },

        stream: function ( index ) {
            //isn't used?
            console.log('index', index)
        }
    }
}