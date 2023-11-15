const nodemailer = require("nodemailer");
const aws = require("aws-sdk");

// Configure AWS SES
aws.config.update({});

// Create Nodemailer transporter using AWS SES
const transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" }),
});

// Email options
const mailOptions = {
  from: "studieledd@gmail.com", // Sender email address
  to: "pb.bennett@yahoo.co.uk", // Recipient email address
  subject: "Subject of the email",
  text: "Body of the email",
  html: "<p>HTML body of the email</p>",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("Email sent: " + info.response);
  }
});

// let nodemailer = require("nodemailer");
// let aws = require("@aws-sdk/client-ses");
// let { defaultProvider } = require("@aws-sdk/credential-provider-node");

// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: "us-east-1",
//   defaultProvider,
// });

// // create Nodemailer SES transporter
// let transporter = nodemailer.createTransport({
//   SES: { ses, aws },
// });

// // send some mail
// transporter.sendMail(
//   {
//     from: "studieledd@gmail.com",
//     to: "pb.bennett@yahoo.co.uk",
//     subject: "Message",
//     text: "I hope this message gets sent!",
//     ses: {
//       // optional extra arguments for SendRawEmail
//       Tags: [
//         {
//           Name: "tag_name",
//           Value: "tag_value",
//         },
//       ],
//     },
//   },
//   (err, info) => {
//     console.log(info.envelope);
//     console.log(info.messageId);
//   }
// );
