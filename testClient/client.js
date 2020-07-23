const io = require('socket.io-client');

const socket1 = io.connect('http://localhost:8000');
const socket2 = io.connect('http://localhost:8000');
const testRoom = 'test_room';

joinRoom(socket1, testRoom);
joinRoom(socket2, testRoom);
sendCommandToRoom(socket1, testRoom, 'test_command');

// sendCommandToRoom('test_command');
// sendCommandToRoom('play_command');

function joinRoom(socket, roomId) {
    const timestamp = new Date();
    console.log(`[${timestamp.toISOString()}] - Join Room:
    ${roomId}`);
    socket.emit('joinRoom', roomId);
}

function getInfo(socket, roomId) {
    const timestamp = new Date();
    console.log(`[${timestamp.toISOString()}] - Get Info`);
    socket.on(roomId).emit("getInfo");    
}

function sendInfo(socket, roomId, info) {
    const timestamp = new Date();
    console.log(`[${timestamp.toISOString()}] - Info:
    ${JSON.stringify(info, null, 4)}`);
    socket.on(roomId).emit("info", info)
}

function sendCommandToRoom(socket, roomId, command) {
    const timestamp = new Date();
    console.log(`[${timestamp.toISOString()}] - Send Command to Room (${roomId}):
    ${JSON.stringify(command, null, 4)}`);
    socket.emit('sendCommandToRoom', roomId, command);
}

// socket.on('command', function (data) {
//     console.log('Broadcast #test command# received');
//     console.log(data);
// });

// socket.on('command', function (data) {
//     console.log('Broadcast #play command# received');
//     console.log(data);
// });
