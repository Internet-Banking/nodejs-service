// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv')
dotenv.config()
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
// console.log(`sendgrid:`, SENDGRID_API_KEY);
sgMail.setApiKey(`${SENDGRID_API_KEY}`);

const msg = {
  to: 'hoangnghia.binhthuan@gmail.com',
  from: 'team29internetbanking@gmail.com', // email of from have to equal to email of sender in account sendgrid
  subject: 'INTERNET_BANKING_29 - OTP',
  text: 'Your OTP: 773023',
  html: '<strong>Your OTP: 773023</strong>'
};

sgMail
  .send(msg)
  // .then((res) => {console.log(res)})
  // .catch(err => console.log(err))