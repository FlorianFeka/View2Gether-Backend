const io = require('socket.io-client');
const readline = require('readline-sync');

var socket = io.connect('http://localhost:8000');
socket.on('test', function(data) {
    console.log('Data received:');

    console.log(data);
});
socket.on('testBoradcast', function(data) {
    console.log('Broadcast test:');
    console.log(data);
});
joinRoom();
sendCommandToRoom('test_command');

function joinRoom() {
    console.log(' ####### Join room ####### ');
    socket.emit('joinRoom', '1234');
}

function sendCommandToRoom(command) {
    console.log(' ####### Second command ####### ');
    socket.emit('sendCommandToRoom', '1234', command);
}

socket.on('test_command', function() {
    console.log('Broadcast test command received');
});
