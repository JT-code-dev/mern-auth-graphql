import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Import schema from Book.js
import bookSchema from './Book.js';
import type { BookDocument } from './Book.js';

//  set `_id` as a string in the interface
export interface UserDocument extends Document {
  _id: string;  //  This ensures TypeScript knows `_id` is a string
  username: string;
  email: string;
  password: string;
  savedBooks: BookDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
  },
  // Set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  console.log("🔍 Entered Password:", password);
  console.log("🔍 Stored Hash in DB:", this.password);

  const isMatch = await bcrypt.compare(password, this.password);
  console.log("✅ Password Match Result:", isMatch);

  return isMatch;
};


// When we query a user, we'll also get another field called `bookCount`
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
