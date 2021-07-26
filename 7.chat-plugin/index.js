const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const allRooms = [];
const activeUsers = new Set();

app.get('/crm', (req, res) => {
    res.sendFile(__dirname + '/crm.html');
});

app.get('/lead', (req, res) => {
    res.sendFile(__dirname + '/lead.html');
});

app.get('/landingPage', (req, res) => {
    res.sendFile(__dirname + '/lead.html');
});

app.get('/crmChat', (req, res) => {
    res.sendFile(__dirname + '/crm.html');
});

io.on('connection', (socket) => {
  
   // var activeUsers=io.engine.clientsCount;
    console.log(activeUsers);
    socket.join('crm');

    socket.on('welcome message', (data) => {
        io.emit('welcome message', data.msg)
    });

    socket.on('admin message', ({ room, msg }) => {
        
        io.in(room).emit('admin message', msg) 
    });

    socket.on('lead message', (leadId, msg, isFirstMsg) => {
        if (isFirstMsg) {
            allRooms.push(leadId)
         //   console.log(allRooms);
            socket.join(leadId)
            io.in('crm').emit('new message', leadId, msg);
        }
        else {
            io.in(leadId).emit('lead message', msg)
            
        }
    });

    socket.on('new lead', (leadId, msg) => {
        socket.join(leadId)
        io.in(leadId).emit('lead message', msg)
        
    });
    socket.on('disconnecting', () => {
        console.log(socket.rooms); // the Set contains at least the socket ID
      });
});

server.listen(9034, () => {
    console.log('listening on *:9034');
});