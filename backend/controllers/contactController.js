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
    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

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

module.exports = {
  submitContactForm
};
