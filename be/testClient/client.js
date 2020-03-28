const io = require('socket.io-client');

var socket = io.connect("http://localhost:8000");
socket.on("test", function (data) {
    console.log("Data received:");

    console.log(data);
})
console.log("try it")