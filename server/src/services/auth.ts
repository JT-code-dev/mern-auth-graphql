import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

// Function to generate JWT token
export const signToken = (user: JwtPayload): string => {
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Ensure we pass a plain object, not a Mongoose document
  const userPayload = {
    _id: user._id.toString(), // Convert ObjectId to string
    username: user.username,
    email: user.email,
  };

  return jwt.sign(userPayload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to authenticate token and return user data
export const authenticateToken = (req: Request): JwtPayload | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    return jwt.verify(token, secretKey) as JwtPayload; // Return decoded user data
  } catch (error) {
    return null; // If invalid token, return null
  }
};
