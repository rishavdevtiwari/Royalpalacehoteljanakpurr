
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
        pass: process.env.EMAIL_PASSWORD
      },
      debug: true // Enable debugging
    });
  }
  return transporter;
};

// Send booking confirmation email
export const sendBookingConfirmation = async (booking) => {
  try {
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e3a8a;">Royal Palace Hotel</h1>
            <p>Thank you for your booking!</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Booking Details</h2>
            <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
            <p><strong>Check-in Date:</strong> ${checkInDate}</p>
            <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
            <p><strong>Room Type:</strong> ${booking.roomId.roomTypeId.name}</p>
            <p><strong>Room Number:</strong> ${booking.roomId.roomNumber}</p>
            <p><strong>Number of Guests:</strong> ${booking.adults} Adults, ${booking.children} Children</p>
            <p><strong>Total Amount:</strong> NPR ${booking.totalAmount.toLocaleString()}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1e3a8a;">Important Information</h3>
            <ul>
              <li>Check-in time: 12:00 PM</li>
              <li>Check-out time: 12:00 PM</li>
              <li>Please present your ID at the time of check-in</li>
            </ul>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px;">
            <p style="margin-top: 0;"><strong>Special Requests:</strong> ${booking.specialRequests || 'None'}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>If you have any questions, please contact us at:</p>
            <p>Email: info@royalpalacehotel.com | Phone: +977-1-4123456</p>
          </div>
        </div>
      `
    };
    
    return transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
};

// Send booking cancellation email
export const sendBookingCancellation = async (booking) => {
  try {
    const transport = getTransporter();
    
    const mailOptions = {
      from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
      to: booking.userId.email,
      subject: `Booking Cancellation - ${booking.bookingReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e3a8a;">Royal Palace Hotel</h1>
            <p>Your booking has been cancelled</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Booking Details</h2>
            <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
            <p><strong>Room Type:</strong> ${booking.roomId.roomTypeId.name}</p>
            <p><strong>Room Number:</strong> ${booking.roomId.roomNumber}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>If you have any questions, please contact us at:</p>
            <p>Email: info@royalpalacehotel.com | Phone: +977-1-4123456</p>
          </div>
        </div>
      `
    };
    
    return transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error(`Failed to send cancellation email: ${error.message}`);
  }
};

// Send booking completed email
export const sendBookingCompleted = async (booking) => {
  try {
    const transport = getTransporter();
    
    const mailOptions = {
      from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
      to: booking.userId.email,
      subject: `Thank You for Your Stay - ${booking.bookingReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e3a8a;">Royal Palace Hotel</h1>
            <p>Thank you for staying with us!</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Stay Details</h2>
            <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
            <p><strong>Room Type:</strong> ${booking.roomId.roomTypeId.name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #1e3a8a;">Feedback</h3>
            <p>We hope you enjoyed your stay with us. We would love to hear about your experience!</p>
            <p>Please click <a href="https://royalpalacehotel.com/feedback" style="color: #1e3a8a;">here</a> to leave a review.</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>We hope to see you again soon!</p>
            <p>Email: info@royalpalacehotel.com | Phone: +977-1-4123456</p>
          </div>
        </div>
      `
    };
    
    return transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error(`Failed to send completed stay email: ${error.message}`);
  }
};

// Send payment receipt email
export const sendPaymentReceipt = async (booking, payment) => {
  try {
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e3a8a;">Royal Palace Hotel</h1>
            <p>Payment Receipt</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Payment Details</h2>
            <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
            <p><strong>Payment Date:</strong> ${paymentDate}</p>
            <p><strong>Amount:</strong> NPR ${payment.amount.toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
            <p><strong>Status:</strong> ${payment.paymentStatus}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 15px;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Booking Information</h3>
            <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
            <p><strong>Room Type:</strong> ${booking.roomId.roomTypeId.name}</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>Thank you for your payment!</p>
            <p>Email: info@royalpalacehotel.com | Phone: +977-1-4123456</p>
          </div>
        </div>
      `
    };
    
    return transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error(`Failed to send payment receipt: ${error.message}`);
  }
};

// Send contact form confirmation
export const sendContactConfirmation = async (name, email, subject) => {
  try {
    const transport = getTransporter();
    
    const mailOptions = {
      from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
      to: email,
      subject: `Thank You for Contacting Us - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e3a8a;">Royal Palace Hotel</h1>
            <p>Thank you for contacting us!</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Your Message</h2>
            <p><strong>Subject:</strong> ${subject}</p>
            <p>Dear ${name},</p>
            <p>Thank you for contacting Royal Palace Hotel. We have received your message and will get back to you shortly.</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p>If you have any urgent queries, please contact us at:</p>
            <p>Email: info@royalpalacehotel.com | Phone: +977-1-4123456</p>
          </div>
        </div>
      `
    };
    
    return transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error(`Failed to send contact confirmation: ${error.message}`);
  }
};

// Send contact form notification to staff
export const sendContactNotification = async (contact) => {
  try {
    const transport = getTransporter();
    
    const mailOptions = {
      from: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
      to: process.env.HOTEL_EMAIL || 'royalpalacehotel@gmail.com',
      subject: `New Contact Form Submission: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1e3a8a;">Royal Palace Hotel</h1>
            <p>New Contact Form Submission</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Contact Details</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Message:</strong> ${contact.message}</p>
            <p><strong>Submission Date:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
          </div>
        </div>
      `
    };
    
    return transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error(`Failed to send contact notification: ${error.message}`);
  }
};

export default {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingCompleted,
  sendPaymentReceipt,
  sendContactConfirmation,
  sendContactNotification
};
