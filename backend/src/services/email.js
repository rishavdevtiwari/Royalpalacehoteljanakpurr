const nodemailer = require('nodemailer');

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
const sendBookingConfirmation = async (booking) => {
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #334155; margin: 0;">Royal Palace Hotel</h1>
          <p style="color: #64748b;">Your Booking is Confirmed</p>
        </div>
        
        <div style="background-color: #f8f5f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #334155; margin-top: 0;">Booking Details</h2>
          <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
          <p><strong>Room Type:</strong> ${booking.roomId.roomTypeId.name}</p>
          <p><strong>Room Number:</strong> ${booking.roomId.roomNumber}</p>
          <p><strong>Check-in:</strong> ${checkInDate}</p>
          <p><strong>Check-out:</strong> ${checkOutDate}</p>
          <p><strong>Guests:</strong> ${booking.adults} Adults${booking.children > 0 ? `, ${booking.children} Children` : ''}</p>
          <p><strong>Total Amount:</strong> NPR ${booking.totalAmount}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #334155;">Guest Information</h3>
          <p><strong>Name:</strong> ${booking.userId.name}</p>
          <p><strong>Email:</strong> ${booking.userId.email}</p>
          <p><strong>Phone:</strong> ${booking.userId.phone || 'Not provided'}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        
        <div style="margin: 20px 0;">
          <h3 style="color: #334155;">Special Requests</h3>
          <p>${booking.specialRequests || 'None'}</p>
        </div>
        
        <div style="margin: 20px 0; text-align: center;">
          <p>Thank you for choosing Royal Palace Hotel! We look forward to welcoming you.</p>
          <p>If you have any questions about your reservation, please contact us at:</p>
          <p><a href="mailto:${process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com'}" style="color: #334155;">${process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com'}</a></p>
        </div>
      </div>
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send booking cancellation email
const sendBookingCancellation = async (booking) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: booking.userId.email,
    subject: `Booking Cancellation - ${booking.bookingReference}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #334155; margin: 0;">Royal Palace Hotel</h1>
          <p style="color: #64748b;">Your Booking Has Been Cancelled</p>
        </div>
        
        <div style="margin: 20px 0;">
          <p>Dear ${booking.userId.name},</p>
          <p>Your booking with reference number <strong>${booking.bookingReference}</strong> has been cancelled successfully.</p>
          <p>If you did not request this cancellation, please contact us immediately.</p>
        </div>
        
        <div style="margin: 20px 0; text-align: center;">
          <p>If you have any questions, please contact our customer service:</p>
          <p><a href="mailto:${process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com'}" style="color: #334155;">${process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com'}</a></p>
        </div>
      </div>
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send booking completed email
const sendBookingCompleted = async (booking) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: booking.userId.email,
    subject: `Thank You for Your Stay - ${booking.bookingReference}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #334155; margin: 0;">Royal Palace Hotel</h1>
          <p style="color: #64748b;">Thank You for Your Stay</p>
        </div>
        
        <div style="margin: 20px 0;">
          <p>Dear ${booking.userId.name},</p>
          <p>Thank you for choosing Royal Palace Hotel for your recent stay.</p>
          <p>We hope you enjoyed your time with us and would appreciate your feedback. Please consider leaving a review of your experience.</p>
        </div>
        
        <div style="background-color: #f8f5f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #334155; margin-top: 0;">Stay Details</h3>
          <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
          <p><strong>Room Type:</strong> ${booking.roomId.roomTypeId.name}</p>
          <p><strong>Room Number:</strong> ${booking.roomId.roomNumber}</p>
        </div>
        
        <div style="margin: 20px 0; text-align: center;">
          <p>We look forward to welcoming you again in the future!</p>
          <p>Best Regards,<br>The Royal Palace Hotel Team</p>
        </div>
      </div>
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send payment receipt email
const sendPaymentReceipt = async (booking, payment) => {
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #334155; margin: 0;">Royal Palace Hotel</h1>
          <p style="color: #64748b;">Payment Receipt</p>
        </div>
        
        <div style="background-color: #f8f5f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #334155; margin-top: 0;">Payment Details</h2>
          <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
          <p><strong>Amount:</strong> NPR ${payment.amount}</p>
          <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
          <p><strong>Payment Date:</strong> ${paymentDate}</p>
          <p><strong>Status:</strong> ${payment.paymentStatus}</p>
          <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
        </div>
        
        <div style="margin: 20px 0; text-align: center;">
          <p>Thank you for your payment. This serves as your official receipt.</p>
          <p>If you have any questions regarding this payment, please contact us at:</p>
          <p><a href="mailto:${process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com'}" style="color: #334155;">${process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com'}</a></p>
        </div>
      </div>
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send contact form confirmation
const sendContactConfirmation = async (name, email, subject) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: email,
    subject: `Thank You for Contacting Us - ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #334155; margin: 0;">Royal Palace Hotel</h1>
          <p style="color: #64748b;">Thank You for Reaching Out</p>
        </div>
        
        <div style="margin: 20px 0;">
          <p>Dear ${name},</p>
          <p>Thank you for contacting Royal Palace Hotel. We have received your message regarding "${subject}".</p>
          <p>Our team will review your inquiry and get back to you as soon as possible. During peak times, please allow up to 24-48 hours for a response.</p>
        </div>
        
        <div style="margin: 20px 0; text-align: center;">
          <p>Best Regards,<br>The Royal Palace Hotel Team</p>
        </div>
      </div>
    `
  };
  
  return transport.sendMail(mailOptions);
};

// Send contact form notification to staff
const sendContactNotification = async (contact) => {
  const transport = getTransporter();
  
  const mailOptions = {
    from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    to: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #334155; margin: 0;">Royal Palace Hotel</h1>
          <p style="color: #64748b;">New Contact Form Submission</p>
        </div>
        
        <div style="background-color: #f8f5f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #334155; margin-top: 0;">Contact Details</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 10px; border-radius: 5px;">
            ${contact.message}
          </div>
        </div>
        
        <div style="margin: 20px 0; text-align: center;">
          <p>Please respond to this inquiry as soon as possible.</p>
        </div>
      </div>
    `
  };
  
  return transport.sendMail(mailOptions);
};

module.exports = {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingCompleted,
  sendPaymentReceipt,
  sendContactConfirmation,
  sendContactNotification
};
