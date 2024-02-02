# simple-chat-app

## Overview

### Project Structure
**Server Side:**
The server is built using Node.js and Express, with Socket.IO handling real-time communication between clients.
The server logic is organized into separate files to promote modularity and clarity: server.js for starting the server and server-setup.js for handling the core server logic.
**Client Side:**
The client-side code is split into an index.html file for the HTML structure and a script.js file for the JavaScript logic.
The client utilizes the Socket.IO library for real-time communication with the server.
### System Design Concepts Explored
This chat application serves as a practical exploration of fundamental system design concepts:

**Pub-Sub Pattern:**
The server employs the publish-subscribe pattern through the use of Socket.IO. Clients subscribe to specific events (e.g., messageHistory, newMessage), allowing for efficient real-time communication.
**Message Queues:**
The chat messages are stored in an in-memory array on the server. This simplistic approach represents a basic form of message storage. Exploring more robust message queuing systems (e.g., RabbitMQ, Apache Kafka) would be a natural next step in enhancing scalability and fault tolerance.
**Auto-incrementing User IDs and Unique Colors:**
The server assigns auto-incrementing user IDs to new users, demonstrating a simple form of user identification. 


### Install Dependencies:
- Make sure Node.js and npm are installed on your machine.
- Run npm install to install the required dependencies.
- Run the Server
### Future Improvements

While this chat application provides a foundational understanding of key system design concepts, there are opportunities for improvement and expansion:

**Persistence**:
Implementing a persistent message storage solution, such as integrating a database, would enhance data durability.
**Scalability**:
Exploring message queuing systems for handling large-scale communication between distributed components can improve system scalability.
**Security Measures:**
Implementing user authentication and securing communication channels would be essential for a production-ready chat application.