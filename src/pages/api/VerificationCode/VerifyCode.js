import { verifyVerificationCode } from "./sender";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { enteredCode } = req.body;
  if (!enteredCode) {
    return res.status(400).json({ message: "Verification code is required" });
  }
  const Confirmation = req.cookies.Confirmation;
  const {
    userName,
    firstname,
    lastName,
    avatar,
    adress,
    userType,
    zipcode,
    city,
    about,
    email,
    hashedPassword,
    rules,
    num,
  } = JSON.parse(Confirmation);

  const { isValid } = await verifyVerificationCode(enteredCode, email);
  console.log(email, enteredCode);

  if (isValid) {
    try {

    const user = await prisma.user.create({
      data: {
        firstname,
        lastName,
        email:email,
        avatar,
        password: hashedPassword,
        phone_number: num,
        adress,
        Role: userType,
        zipcode,
        city,
        about,
        acceptedRules: rules,
        userName: userName,
        emailVerified: true,
      },
    });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      console.error('Email already exists:', error.meta.target);
    } else {
      console.error('An error occurred:', error);
    }
  }
    return res.status(200).json({ message: "Account verified" });
  } else {
    return res.status(400).json({ message: "Verification code is invalid" });
  }
}
