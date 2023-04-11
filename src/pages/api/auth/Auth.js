import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma';

const authMiddleware = async (req, res, next) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies.token;

    if (!token) {
      return next();
    }

    // Verify token and get user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Get user from database
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return next();
    }

    // Set user object on request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next();
  }
};

export default authMiddleware;
