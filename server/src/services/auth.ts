import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

// Function to authenticate token and return user data
  const authenticateToken = (req: Request): JwtPayload | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    return jwt.verify(token, secretKey) as JwtPayload; //Return decoded user data
  } catch (error) {
    return null; // If invalid token, return null
  }
};

// Function to generate JWT token
  const signToken = (user: JwtPayload): string => {
  const secretKey = process.env.JWT_SECRET_KEY || '';
  return jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};
export { authenticateToken, signToken };



