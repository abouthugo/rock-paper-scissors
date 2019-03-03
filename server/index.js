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

    // Give the user its id
    player.emit("id", { id: player.id });

    // Lets the user know who is connected when he enters the game
    player.emit('entering', { players: [...connectedUsers] });

    // When a new player connects, let people know
    player.on("connected", ({ user }) => {
        let data = { ...user, id: player.id } ;
        player.broadcast.emit("connected", { user: { ...data } });
        connectedUsers.push({ ...data });
    });

    // When a player leaves
    player.on("leave", ({id}) => {
        console.log(`Player ${player.id} left`);
        io.sockets.emit("leave", { id: player.id });
        connectedUsers = connectedUsers.filter(v => v.id !== id);
        console.log(connectedUsers);
        player.disconnect(0);
    });
});