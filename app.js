const http = require("http");
const express = require("express");
const app = express();
const io = require('socket.io');
const db = require("./dbconn");

const httpServer = http.createServer(app).listen(8000);

const socketServer = io(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

socketServer.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('chat', (msg) => {
		console.log(msg);
		db.insert('chat', `NULL, '${msg.room}', '${msg.user}', '${msg.content}', NOW()`);
		socket.emit('chat', msg);
	});
});