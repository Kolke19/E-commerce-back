const nodemailer = require ('nodemailer');
require('dotenv').config();

const sendEmail = async options => {
 const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_PASSWORD
  }
});
const mailOptions = {
    from:"Jorge Gonzalez <hello@productos@gmail.com>",
    to: options.email,
    subjet: options.subjet,
    text:options.message
};
await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;