const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'damien.blanda93@ethereal.email',
            pass: 'Pp8mHj98vpUA9n7efa'
        }
      });
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("Email sent");
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = sendEmail;