import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
let transporter;

// Initialize transporter on first use
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password'
      }
    });
  }
  return transporter;
};

// Send booking confirmation email
export const sendBookingConfirmation = async (booking) => {
  const transport = getTransporter();
  
  // Format dates
  const checkInDate = new Date(booking.checkInDate).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: booking.userId.email,
    subject: `Booking Confirmation - ${booking.bookingReference}`,
    html: `
      // ... keep existing code (HTML email template for booking confirmation)
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send booking cancellation email
export const sendBookingCancellation = async (booking) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: booking.userId.email,
    subject: `Booking Cancellation - ${booking.bookingReference}`,
    html: `
      // ... keep existing code (HTML email template for booking cancellation)
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send booking completed email
export const sendBookingCompleted = async (booking) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: booking.userId.email,
    subject: `Thank You for Your Stay - ${booking.bookingReference}`,
    html: `
      // ... keep existing code (HTML email template for completed stays)
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send payment receipt email
export const sendPaymentReceipt = async (booking, payment) => {
  const transport = getTransporter();
  
  const paymentDate = new Date(payment.paymentDate).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: booking.userId.email,
    subject: `Payment Receipt - ${payment.transactionId}`,
    html: `
      // ... keep existing code (HTML email template for payment receipt)
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send contact form confirmation
export const sendContactConfirmation = async (name, email, subject) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: email,
    subject: `Thank You for Contacting Us - ${subject}`,
    html: `
      // ... keep existing code (HTML email template for contact confirmation)
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send contact form notification to staff
export const sendContactNotification = async (contact) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
      // ... keep existing code (HTML email template for staff notifications)
    `
  };
  
  return transport.sendMail(mailOptions);
};

export default {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingCompleted,
  sendPaymentReceipt,
  sendContactConfirmation,
  sendContactNotification
};
