const io = require('socket.io-client');

var socket = io.connect('http://localhost:8000');
socket.on('test', function(data) {
    console.log('Data received:');

    console.log(data);
});
socket.on('testBoradcast', function(data) {
    console.log('Broadcast test:');
    console.log(data);
});
// socket.to('test').emit('sendCommandToRoom', 'testCommand');
