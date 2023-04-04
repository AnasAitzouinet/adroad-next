import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=None`);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      // Email already exists in the database
      return res.status(409).json({ message: 'Email already exists' });
    }

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
