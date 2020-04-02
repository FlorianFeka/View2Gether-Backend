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

var command = '';

while (command !== 'exit') {
    command = readline.question('1: Join room\n2: Send broadcast\nWhich command?: ');
    console.log(command);
    switch (command) {
        case '1':
            joinRoom();
            break;
        case '2':
            sendCommandToRoom('test_command');
            break;
        default:
            break;
    }
}

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
// socket.to('test').emit('sendCommandToRoom', 'testCommand');
