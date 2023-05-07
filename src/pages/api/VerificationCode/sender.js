import nodemailer from "nodemailer";
import prisma from "../../../../lib/prisma";

// Initialize an empty array to store the verification codes
const verificationCodes = [];

export function generateVerificationCode(email) {
  // Generate a random alphanumeric code with a length of 6 characters
  const verificationCode = Math.random().toString(36).substr(2, 6).toUpperCase();
  // Add the timestamp to the verification code
  const timestamp = Date.now();
  const codeWithTimestamp = verificationCode + timestamp.toString();
  // Add the generated code and its timestamp to the verification codes array
  verificationCodes.push({ email, codeWithTimestamp });
  // Return an object containing the email and verification code
  return { email, verificationCode };
}


export async function sendVerificationCode(email) {
  const verificationCode = generateVerificationCode(email);
  verificationCodes.push({ email, verificationCode});
  // Generate the verification code
  console.log(verificationCode)
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user:process.env.SEND_Email_Name,
      pass: process.env.SEND_EMAIL
    },
  });
  const mailOptions = {
    from: "anas.mailnodesender@gmail.com",
    to: email,
    subject: "Verification code",
    text: `Your verification code is ${verificationCode.verificationCode}`,
  };
  await transporter.sendMail(mailOptions);
  return verificationCode.verificationCode
}

export async function verifyVerificationCode(enteredCode, email) {
  const verificationCode = await prisma.VerificationCode.findUnique({
    where: {
      email: email,
    }
  })
  console.log('te fe',verificationCode)
  if (!verificationCode) {
    console.log("here 1")

    // email not found
    return { isValid: false };
  } else if (verificationCode.VerificationCode !== enteredCode) {
    console.log("here 2")
    // verification code is invalid
    return { isValid: false };
  } else if (Date.now() - verificationCode.createdAt.getTime() > 15 * 60 * 1000) {
    // verification code has expired
    await prisma.VerificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    })
    return { isValid: false };
  } 
  else {
  //   // verification code is valid, delete it from the database
    await prisma.VerificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    })
    return { isValid: true };
  }
}


