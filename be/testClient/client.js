const io = require('socket.io-client');

var socket = io.connect('http://localhost:8000');

joinRoom();
sendCommandToRoom('test_command');
sendCommandToRoom('play_command');

function joinRoom() {
    console.log(' ####### Join room ####### ');
    socket.emit('joinRoom', '1234');
}

function sendCommandToRoom(command) {
    console.log(' ####### Second command ####### ');
    socket.emit('sendCommandToRoom', '1234', command);
}

socket.on('test_command', function() {
    console.log('Broadcast #test command# received');
});

socket.on('play_command', function() {
    console.log('Broadcast #play command# received');
});
