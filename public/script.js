// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let userId;
  
    // Display existing messages
    socket.on('messageHistory', (data) => {
      userId = data.userId;
  
      const messageList = document.getElementById('message-list');
      data.messages.forEach((message) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${message.userId}: ${message.text}`;
        listItem.style.color = message.color;
        messageList.appendChild(listItem);
      });
    });
  
    // Display new messages
    socket.on('newMessage', (message) => {
      const messageList = document.getElementById('message-list');
      const listItem = document.createElement('li');
      listItem.textContent = `${message.userId}: ${message.text}`;
      listItem.style.color = message.color;
      messageList.appendChild(listItem);
    });
  
    // Function to send a new message
    window.sendMessage = () => {
      const inputElement = document.getElementById('message-input');
      const messageText = inputElement.value.trim();
  
      if (messageText !== '') {
        const messageData = { text: messageText };
        socket.emit('sendMessage', messageData);
        inputElement.value = '';
      }
    };
  });
  