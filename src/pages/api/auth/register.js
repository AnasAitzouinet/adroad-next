import prisma from "../../../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client";
import {
  generateVerificationCode,
  sendVerificationCode,
} from "../VerificationCode/sender";
import cookie from "cookie";

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isPhoneNumberValid = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};
const isZipcodeValid = (zipcode) => {
  const zipcodeRegex = /^\d{5}$/;
  return zipcodeRegex.test(zipcode);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    userName,
    firstname,
    lastName,
    email,
    avatar,
    adress,
    userType,
    zipcode,
    city,
    about,
    phone_number,
  } = req.body;

  // Validate all input fields
  if (
    !firstname ||
    !lastName ||
    !email ||
    !avatar ||
    !adress ||
    !userType ||
    !zipcode ||
    !city ||
    !about ||
    !phone_number
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!isPhoneNumberValid(phone_number)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  if (!isZipcodeValid(zipcode)) {
    return res.status(400).json({ message: "Invalid zipcode" });
  }

  try {
    const registrationData = req.cookies.registrationData;
    const { hashedPassword, rules } = JSON.parse(registrationData);
    const num = Number(phone_number);
    const sendEmail = await sendVerificationCode(email);

    const user = await prisma.VerificationCode.create({
      data: {
        email,
        VerificationCode:sendEmail
      },
    });
    
    const Confirmation = {
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
      num
    };
    console.log(Confirmation);
    const cookieValue = JSON.stringify(Confirmation);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 900,
    };

    const serializedCookie = cookie.serialize(
      "Confirmation",
      cookieValue,
      cookieOptions
    );

    res.setHeader("Set-Cookie", serializedCookie);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Email already exists in the database
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
