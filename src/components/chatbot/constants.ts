
import { BookingStep } from './types';

export const destinations = ["Goa", "London", "Paris"];

export const initialBookingData = {
  destination: "",
  name: "",
  email: "",
  age: "",
  numPeople: "",
  fromDate: "",
  toDate: "",
  numDays: "",
};

export const bookingQuestions: { step: BookingStep, question: string }[] = [
  { step: 'destination', question: `Which place would you like to visit? (${destinations.join(", ")})` },
  { step: 'name', question: "What's your name?" },
  { step: 'email', question: "What's your email address?" },
  { step: 'age', question: "What's your age?" },
  { step: 'numPeople', question: "How many people are booking?" },
  { step: 'fromDate', question: "What is the start date? (YYYY-MM-DD)" },
  { step: 'toDate', question: "What is the end date? (YYYY-MM-DD)" },
  { step: 'numDays', question: "How many days?" },
  { step: 'confirmation', question: "Please review your booking details above. Type 'confirm' to proceed with payment or 'edit' to make changes:" },
];

export function isBookIntent(text: string) {
  return text.toLowerCase().includes('book ticket');
}
