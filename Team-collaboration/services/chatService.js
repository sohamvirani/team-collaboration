const ChatMessage = require('../models/chatModel');

const storeMessage = async (data) => {
  const newMessage = new ChatMessage(data);
  return await newMessage.save();
};

const fetchMessagesByRoomId = async (roomId) => {
  return await ChatMessage.find({ roomId }).sort({ timestamp: 1 });
};

module.exports = {
  storeMessage,
  fetchMessagesByRoomId,
};
