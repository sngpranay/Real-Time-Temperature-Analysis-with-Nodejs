var SerialPort = require("serialport");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var portName = process.argv[2],
  portConfig = {
    baudRate: 9600,
    parser: SerialPort.parsers.readline("\n")
  };

var sp;

sp = new SerialPort.SerialPort(portName, portConfig);

app.get('/rt', function(req, res) {
  res.sendfile('realTime_v3.html');
});

app.get('/', function(req, res) {
  res.sendfile('index.html');
});
// app.use(express.static(__dirname + '/public'));



http.listen(3000, function() {
  console.log('listening on *:3000');
});


sp.on('data', function(data) {
  console.log(data);
  message = data.split(',');
  // console.log(message[0]);
  if (message[0] === 'A') {
    data = message[1];
    console.log(data);
    io.emit("A", data);
  }
  if (message[0] === 'B') {
    data = message[1];
    io.emit("B", data);
  }
  if (message[0] === 'C') {
    data = message[1];
    io.emit("C", data);
  }
  if (message[0] === 'D') {
    data = message[1];
    io.emit("D", data);
  }
});


/// On Button Press THis function happens
io.on("connection", function(socket) {
  console.log("We are Connected !!");

  socket.on("Select_sensor", function(select_sensor) {
    console.log(select_sensor);
  });
  socket.on("Start", function(starttime) {
    console.log(starttime);
  });
  socket.on("End", function(endtime) {
    console.log(endtime);
  });
  socket.on("buttonPress", function(string)


    console.log(string)

    var x = [{
      "Id": 1,
      "UserName": 20
    }, {
      "Id": 2,
      "UserName": 30
    }, {
      "Id": 3,
      "UserName": 40
    }];

    newString = JSON.stringify(x)
    console.log(newString)
    io.emit("A1", newString); //Json.stringify



  });
});
