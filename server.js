// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Store messages in memory not persistant solution
const messages = [];
const userColors = {};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages to the newly connected client
  socket.emit('messageHistory', { messages: messages });

  // Listen for new messages from clients
  socket.on('sendMessage', ({ userId, text }) => {
    let userColor = userColors[userId];
  
    // Generate a random color if the user doesn't have one
    if (!userColor) {
      userColor = getRandomColor();
      userColors[userId] = userColor;
    }
  
    const message = {
      userId,
      text,
      color: userColor,
      timestamp: new Date(),
    };
  
    // Store the message in the in-memory array
    messages.push(message);
  
    // Broadcast the new message to all connected clients
    io.emit('newMessage', message);
  });

  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


  
  