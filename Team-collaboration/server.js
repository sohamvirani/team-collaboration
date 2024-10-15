require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./db/db');
const socketIO = require('socket.io');
const cors = require('cors');
const { saveMessage } = require('./services/chatService');
const setupChatSocket = require('./sockets/chatSocket');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const server = http.createServer(app);

// Initialize database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Setting up Socket.IO for real-time messaging
setupChatSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

// Manage Socket.IO connections
io.on('connection', (socket) => {
  console.log('A new client has connected');

  // Join a specific chat room
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User has joined room: ${roomId}`);
  });

  // Handle incoming chat messages
  socket.on('chatMessage', async ({ roomId, user, message }) => {
    // Save the message to the database
    await saveMessage({ roomId, user, message });
    
    // Emit the message to other users in the room
    io.to(roomId).emit('message', { user, message });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});
