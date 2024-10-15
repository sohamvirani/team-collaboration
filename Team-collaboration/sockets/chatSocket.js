const socketIO = require('socket.io');
const ChatMessage = require('../models/chatModel');

const setupChatSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User has entered room: ${roomId}`);
    });

    socket.on('chatMessage', async ({ roomId, message }) => {
      try {
        const savedMessage = await ChatMessage.create({ roomId, message });
        io.to(roomId).emit('message', savedMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });
  });
};

module.exports = setupChatSocket;
