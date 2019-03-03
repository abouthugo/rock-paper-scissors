const express = require('express'),
    socket = require('socket.io'),
    app = express();

let server = app.listen(5000, () => {
    console.log("App running on port 5000");
});

let io = socket(server);
let connectedUsers = [];
io.on('connection', (player) => {
    console.log(`New player: ${player.id}`);

    // Lets the user now who is connected when he enters the game
    player.emit('entering', { id: player.id, connected: connectedUsers.map(i => i.username) });

    // When a new player connects, let people know
    player.on("connected", (player_name) => {
        io.sockets.emit("connected", player_name);
        connectedUsers.push({ id: player.id, name: player_name });
    });

    // When a player leaves
    player.on("leave", () => {
        console.log(`Player ${player.id} left`);
       // player.disconnect(0);
       // io.sockets.emit("leave", player_name);
       // connectedUsers = connectedUsers.filter(v => v.id !== id);
       // console.log(`${player_name} left.`);
    });
});