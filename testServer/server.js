var io = require("socket.io")(8000);

console.log("Socket setup started ...");

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    const timestamp = new Date();
    console.log(`[server.js] ${timestamp.toISOString()} Join Room: 
    ${roomId}`);
    socket.join(roomId);
  });

  socket.on("getInfo", (roomId) => {
    const timestamp = new Date();
    console.log(`[server.js] ${timestamp.toISOString()} Get Info`);
    socket.to(roomId).emit("getInfo");
  });

  socket.on("sendInfo", (roomId, info) => {
    const timestamp = new Date();
    console.log(`[server.js] ${timestamp.toISOString()} Send Info:
    ${JSON.stringify(info, null, 4)}`);

    io.to(roomId).emit("info", info);
  });

  socket.on("sendCommand", (roomId, command) => {
    const timestamp = new Date();
    console.log(
      `[server.js] ${timestamp.toISOString()} Command Sent: 
      ${JSON.stringify(command, null, 4)}`
    );

    io.to(roomId).emit("command", command);
  });
});

console.log("Socket setup finished ...");
