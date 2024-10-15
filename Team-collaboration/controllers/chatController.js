const ChatMessage = require('../models/chatModel');

exports.getChatMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const chatMessages = await ChatMessage.find({ roomId }).populate('sender', 'name email');
    res.status(200).json({ success: true, data: chatMessages });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
