// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Store messages in memory (for simplicity, not recommended for production)
const messages = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages to the newly connected client
  socket.emit('messageHistory', messages);

  // Listen for new messages from clients
  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.emit('newMessage', message); // Broadcast the new message to all connected clients
  });

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
