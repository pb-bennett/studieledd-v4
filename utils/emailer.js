import nodemailer from "nodemailer";
import aws from "aws-sdk";
import User from "@/models/user";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

aws.config.update({
  // move to .env
  accessKeyId: process.env.IAM_API_KEY,
  secretAccessKey: process.env.IAM_SECRET,
  region: process.env.AWS_REGION,
});

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hased token

    // const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const hashedToken = await randomstring.generate({ length: 64 });

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      SES: new aws.SES({ apiVersion: "2010-12-01" }),
    });

    const mailOptions = {
      from: "studieledd@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.NEXT_PUBLIC_URL
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.NEXT_PUBLIC_URL
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
