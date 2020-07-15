var io = require("socket.io")(8000);

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    const timestamp = new Date();
    console.log(`[server.js] ${timestamp.toISOString()} Join Room: 
    ${roomId}`);
    socket.join(roomId);
  });

  socket.on("getInfo", (roomId, info) => {
    const timestamp = new Date();
    console.log(`[server.js] ${timestamp.toISOString()} Get Info`);
  });

  socket.on("sendCommandToRoom", (room, command) => {
    const timestamp = new Date();
    console.log(
      `[server.js] ${timestamp.toISOString()} Command Sent: 
      ${JSON.stringify(command, null, 4)}`
    );

    io.to(room).emit("command", command);
  });
});
