const nodemailer = require("nodemailer");
require("dotenv").config();
const { AUTH_USER, AUTH_PASS } = process.env;

const URL = "https://henry-gift.vercel.app";
// const URL = "http://127.0.0.1:5173";

let mailTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: AUTH_USER,
    pass: AUTH_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const sendCode = (recipient, confirmationCode) => {
  console.log("Check");
  mailTransport
    .sendMail({
      from: AUTH_USER,
      to: recipient,
      subject: "You received a Henry Gift",
      html: `<h1>Redeem Code</h1>
        <h2>Hello</h2>
        <p>You can redeem your gift with the following code <strong>${confirmationCode}</strong> at</p>
        <a href=${URL}/> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const confirmPay = (recipient) => {
  console.log("Check");
  mailTransport
    .sendMail({
      from: AUTH_USER,
      to: recipient,
      subject: "Payment Confirmation",
      html: `<h1>Successful Payment</h1>
        <h2>Thank you for choosing us</h2>
        <p>The recipients of your gift will recieve an email with the redeem code.</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const changePassword = (recipient) => {
  console.log("change pasword");
  mailTransport
    .sendMail({
      from: AUTH_USER,
      to: recipient,
      subject: "Reset password",
      attachDataUrls: true,
      html: `<h1>Reset password:Henry-Gift</h1>
        <h3>Hello customer!!</h3>
        <p>You requested to recover the password.</p>
        <p>Click on the link below and create a new one.</p>
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/password-reset-icon.png" alt="reset-password" width="100" heigth="100"/>
        <a href=${URL}/login/reset-password/${
        recipient.split("@")[0]
      }> Reset password</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const sendQr = (recipient, img) => {
  console.log("Check");
  mailTransport
    .sendMail({
      from: AUTH_USER,
      to: recipient,
      subject: "Service QR Code",
      attachDataUrls: true,
      html: `<h1>You chose a Service!</h1>
        <p>Show the service provider the QR code at the moment of arraging the
        reservation date</p>
        <img src="${img}" />`,
    })
    .catch((err) => console.log(err));
};

module.exports = {
  sendCode,
  confirmPay,
  changePassword,
  sendQr,
};
