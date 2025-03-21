import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Make sure to load environment variables from .env
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('📚 Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

export default mongoose.connection;

