document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    // Display existing messages
    socket.on('messageHistory', (messages) => {
      const messageList = document.getElementById('message-list');
      messages.forEach((message) => {
        const listItem = document.createElement('li');
        listItem.textContent = message;
        messageList.appendChild(listItem);
      });
    });
  
    // Display new messages
    socket.on('newMessage', (message) => {
      const messageList = document.getElementById('message-list');
      const listItem = document.createElement('li');
      listItem.textContent = message;
      messageList.appendChild(listItem);
    });
  
    // Function to send a new message
    window.sendMessage = () => {
      const inputElement = document.getElementById('message-input');
      const message = inputElement.value.trim();
  
      if (message !== '') {
        socket.emit('sendMessage', message);
        inputElement.value = '';
      }
    };
  });
  