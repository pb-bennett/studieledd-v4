import nodemailer from "nodemailer";
import aws from "aws-sdk";
import User from "@/models/user";
import bcrypt from "bcrypt";

aws.config.update({
  // move to .env
  accessKeyId: "AKIA4LKPDIABQNHKAH4Y",
  secretAccessKey: "Ugj9OSMQ+gC4zHUUzalaNAV8g93NWUpJSyZfDl5G",
  region: "eu-north-1", // e.g., 'us-east-1'
});

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hased token

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

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
        process.env.NEXT_PUBLIC_API
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.NEXT_PUBLIC_API
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
