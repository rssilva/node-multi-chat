var Config = require( '../config.js' ),
	events = require('events');
	Lobby = require('../Models/Lobby.js'),
	port = Config.socketPort;

module.exports.Config = Config;
module.exports.eventEmitter = new events.EventEmitter();

module.exports.Servers = require( Config.routes.Servers );
module.exports.Lobby = require( '../Models/Lobby.js' );