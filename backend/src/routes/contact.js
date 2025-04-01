import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import Contact from '../models/Contact.js';
import emailService from '../services/email.js';

const router = express.Router();

// Submit a contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Create contact entry
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });
    
    await contact.save();
    
    // Send confirmation email to the user
    try {
      await emailService.sendContactConfirmation(name, email, subject);
    } catch (emailError) {
      console.error('Failed to send contact confirmation:', emailError);
      // Continue processing even if email fails
    }
    
    // Send notification to hotel staff
    try {
      await emailService.sendContactNotification(contact);
    } catch (emailError) {
      console.error('Failed to send contact notification:', emailError);
      // Continue processing even if email fails
    }
    
    res.status(201).json({
      message: 'Your message has been sent successfully. We will contact you soon.',
      contactId: contact._id
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
  }
});

// Get all contact messages (admin only)
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Failed to fetch contact messages', error: error.message });
  }
});

// Update contact message status (admin only)
router.patch('/:id/status', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['NEW', 'REPLIED', 'ARCHIVED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.status(200).json({
      message: 'Contact status updated successfully',
      contact: updatedContact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ message: 'Failed to update contact status', error: error.message });
  }
});

export default router;
