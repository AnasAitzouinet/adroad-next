import prisma from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authMiddleware from './Auth';
import { serialize } from 'cookie';
import ms from 'ms';


export default async function handler(req, res) {
  await authMiddleware(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password, remember } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      let expiresIn = '1d'; // default expiry time
      if (remember) {
        expiresIn = '30d'; // set longer expiry time if remember me is checked
      }

      const token = jwt.sign({ userId: user.id , LoggedIn: true }, process.env.JWT_SECRET, { expiresIn });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: ms(expiresIn) / 1000,
        path: '/',
      };

      const cookieValue = serialize('token', token, cookieOptions);

      res.setHeader('Set-Cookie', cookieValue);

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}
