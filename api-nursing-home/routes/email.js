const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" }); // Load environment variables

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "Outlook365", // Specify the service (Outlook/Office 365)
  auth: {
    user: process.env.OUTLOOK_EMAIL, // Your Outlook email address
    pass: process.env.OUTLOOK_PASSWORD, // Your Outlook email password
  },
});

const sendTestEmail = () => {
  // Set up email data with Unicode symbols
  let mailOptions = {
    from: `"NoReply Nursing Home" <${process.env.OUTLOOK_EMAIL}>`, // Sender address
    to: "irena.ilisevic@hotmail.com", // List of receivers
    subject: "Hello from Node.js", // Subject line
    text: "This is a test email sent from Node.js using Outlook.", // Plain text body
    html: "<b>This is a test email sent from Node.js using Outlook.</b>", // HTML body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};

const sendEmail = (to, subject, message) => {
  let mailOptions = {
    from: `"NoReply Nursing Home" <${process.env.OUTLOOK_EMAIL}>`,
    to: to,
    subject: subject,
    html: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return error;
    else return true;
  });
};

module.exports = {
  sendTestEmail,
  sendEmail,
};
