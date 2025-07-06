
import { destinations } from './constants';

export const validateDestination = (value: string) => {
  return destinations.some(dest => 
    dest.toLowerCase() === value.toLowerCase()
  );
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateDate = (date: string) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};
