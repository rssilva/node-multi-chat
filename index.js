'use strict';

var events = require('events');

global.eventEmitter = new events.EventEmitter();

var NodeChat = require('./App/NodeChat.js');

var port = NodeChat.Config.socketPort;