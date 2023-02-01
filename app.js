const express = require('express'); //import the express package
const app = express(); // create an express app
const http = require('http'); //import the node server package
const server = http.createServer(app); // use our app file with the server

//add in the socket.io server stuff
const { Server } = require("socket.io");
const io = new Server(server);


const port = process.env.PORT || 3000;

app.use(express.static('public'));


// this is the route handler -> listen for incoming requests and send back a response
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// set up the server to listen for incoming connections at this port
server.listen(port, () => {
  console.log(`listening on ${port}`);
});

// socket.io script goes here
//this bit of code is the connection manager. monitors incoming connections and relays messages
io.on('connection', (socket) => {
    console.log('chat user connected:');

    //step 1 - recieve incoming messasges
    socket.on('chat_message', function(msg) {
      console.log(msg); // have a look at the message data


      // step 2
      // rebroadcast the current message to everyone connected to our chat service
      // it gets sent to all users, including the original message sender

      io.emit('new_message', { id: socket.id, message: msg });
      
    })
  });
//LKvj79rNb1XY0SMMAAAB