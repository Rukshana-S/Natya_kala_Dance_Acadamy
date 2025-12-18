const Contact = require('../models/Contact');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Create new contact entry
    const contactData = {
      name,
      email,
      phone,
      message
    };

    // Link to user if authenticated
    if (req.user && req.user._id) {
      contactData.userId = req.user._id;
    }

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!'
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
};

// Get all messages (Admin)
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Get all messages error:', error);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
};

// Reply to message (Admin)
const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: 'Reply content is required' });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    contact.adminReply = reply;
    contact.repliedAt = new Date();
    contact.status = 'responded';

    await contact.save();

    res.json({
      success: true,
      message: 'Reply sent successfully',
      contact
    });
  } catch (error) {
    console.error('Reply message error:', error);
    res.status(500).json({ message: 'Server error sending reply' });
  }
};

// Get user messages
const getUserMessages = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find messages where userId matches OR email matches the logged-in user's email
    // This ensures they see messages they sent even if they weren't logged in at the time (but used same email)
    const messages = await Contact.find({
      $or: [
        { userId: req.user._id },
        { email: req.user.email }
      ]
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error('Get user messages error:', error);
    res.status(500).json({ message: 'Server error fetching your messages' });
  }
};

module.exports = {
  submitContactForm,
  getAllMessages,
  replyToMessage,
  getUserMessages
};
