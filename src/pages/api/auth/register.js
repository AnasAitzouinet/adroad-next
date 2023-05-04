import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    avatar,
    phoneNumber,
    address,
    userType,
    zipcode,
    city,
    about,
  } = req.body;

  try {
    // upload image to Cloudinary
    const formDataImage = new FormData();
    formDataImage.append("file", avatar);
    formDataImage.append("upload_preset", "my_upload_preset");
    formDataImage.append("folder", "your_folder_name");

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formDataImage
    );

    // create user with data and image URL from Cloudinary
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        avatar: data.secure_url,
        phoneNumber,
        address,
        userType,
        zipcode,
        city,
        about,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; SameSite=None`
    );
    res.setHeader(
      "Set-Cookie",
      `registrationData=; HttpOnly; Secure; SameSite=None; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    ); // Delete the registration data cookie

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
