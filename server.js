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
let nextUserId = 1;

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Auto-increment user ID
  const userId = nextUserId++;
  let userColor = getRandomColor();

  // Store the user color in memory
  userColors[userId] = userColor;

  // Send existing messages and user ID to the newly connected client
  socket.emit('messageHistory', { messages, userId });

  // Listen for new messages from clients
  socket.on('sendMessage', ({ text }) => {
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

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
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

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
