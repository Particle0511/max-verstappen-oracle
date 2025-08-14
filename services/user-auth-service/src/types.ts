export interface User {
  id: number;
  email: string;
  password?: string; // Password is optional as we don't always send it back
}