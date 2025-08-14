import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './types';

// In-memory user store (will be replaced by a database)
const users: User[] = [];
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const registerUser = async (email: string, password: string): Promise<Omit<User, 'password'>> => {
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);
  console.log('Users:', users); // For debugging
  return { id: newUser.id, email: newUser.email };
};

export const loginUser = async (email: string, password: string): Promise<{ token: string }> => {
  const user = users.find(u => u.email === email);
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};