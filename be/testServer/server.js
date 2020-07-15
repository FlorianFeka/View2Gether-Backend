var io = require('socket.io')(8000);

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomId) => {
        const timestamp = new Date();
        console.log(
            `[server.js] ${timestamp.toISOString()} Join Room: ${roomId}`
        );
        socket.join(roomId);
    });

    socket.on('sendCommandToRoom', (room, command) => {
        const timestamp = new Date();
        console.log(
            `[server.js] ${timestamp.toISOString()} command sent: ${JSON.stringify(
                command,
                null,
                4
            )}`
        );

        io.to(room).emit('command', command);
    });
});
