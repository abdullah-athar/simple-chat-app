document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    // Display existing messages
    socket.on('messageHistory', (data) => {
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
      const message = inputElement.value.trim();
  
      if (message !== '') {
        socket.emit('sendMessage', { userId: 'someUserId', text: message }); // You might want to replace 'someUserId' with the actual user ID.
        inputElement.value = '';
      }
    };
});
