const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  // secure: true,
  port: 587,
  auth: {
    user: 'emmie.gerlach@ethereal.email',
    pass: 'uZhHwPGW7T2Bzxxzm5',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <emmie.gerlach@ethereal.email>', // sender address
    to: 'emmie.gerlach@ethereal.email', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

sendEmail();
