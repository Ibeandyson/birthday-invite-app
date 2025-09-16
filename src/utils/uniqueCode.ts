import { v4 as uuidv4 } from 'uuid';

export const generateUniqueCode = (): string => {
  // Generate a 6-character alphanumeric code
  const code = uuidv4().replace(/-/g, '').substring(0, 6).toUpperCase();
  return code;
};

export const validateUniqueCode = (code: string): boolean => {
  // Check if code is 6 characters, alphanumeric, and uppercase
  const codeRegex = /^[A-Z0-9]{6}$/;
  return codeRegex.test(code);
};
