import {SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL, OTP_MAIL_SUBJECT} from '../config'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(`${SENDGRID_API_KEY}`);

const sendOTPMail = async (userEmail, html) => {
  const msg = {
    to: userEmail,
    from: SENDGRID_SENDER_EMAIL, // This email have to equal to email of sender in account sendgrid
    subject: OTP_MAIL_SUBJECT,
    html
  };
  await sgMail.send(msg)
}

export default {
  sendOTPMail
}
