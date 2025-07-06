
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingStep, BookingData, Message } from './types';
import { initialBookingData, bookingQuestions, destinations } from './constants';
import { validateDestination, validateEmail, validateDate } from './validation';

export const useBookingLogic = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I help you today?", isUser: false }
  ]);
  const [bookingMode, setBookingMode] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('destination');
  const [bookingData, setBookingData] = useState<BookingData>({ ...initialBookingData });

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { content, isUser: true }]);
  };

  const botSay = (content: string) => {
    setMessages(prev => [...prev, { content, isUser: false }]);
  };

  const showBookingConfirmation = (data: BookingData) => {
    const confirmationMessage = 
      `Please review your booking details:\n\n` +
      `📍 Destination: ${data.destination}\n` +
      `👤 Name: ${data.name}\n` +
      `📧 Email: ${data.email}\n` +
      `🎂 Age: ${data.age}\n` +
      `👥 Number of People: ${data.numPeople}\n` +
      `📅 From: ${data.fromDate}\n` +
      `📅 To: ${data.toDate}\n` +
      `⏰ Days: ${data.numDays}\n\n` +
      `Type 'confirm' to proceed with payment or 'edit' to make changes.`;
    
    botSay(confirmationMessage);
  };

  const handleBookingInput = async (value: string) => {
    let nextStep: BookingStep = bookingStep;
    let updatedBookingData = { ...bookingData };
    let isValid = true;
    let errorMessage = '';

    switch (bookingStep) {
      case 'destination':
        if (!validateDestination(value)) {
          isValid = false;
          errorMessage = `Please choose from available destinations: ${destinations.join(", ")}`;
        }
        updatedBookingData.destination = value;
        nextStep = 'name';
        break;
      case 'name':
        updatedBookingData.name = value;
        nextStep = 'email';
        break;
      case 'email':
        if (!validateEmail(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        updatedBookingData.email = value;
        nextStep = 'age';
        break;
      case 'age':
        if (isNaN(Number(value)) || Number(value) < 0) {
          isValid = false;
          errorMessage = "Please enter a valid age";
        }
        updatedBookingData.age = value;
        nextStep = 'numPeople';
        break;
      case 'numPeople':
        if (isNaN(Number(value)) || Number(value) < 1) {
          isValid = false;
          errorMessage = "Please enter a valid number of people";
        }
        updatedBookingData.numPeople = value;
        nextStep = 'fromDate';
        break;
      case 'fromDate':
        if (!validateDate(value)) {
          isValid = false;
          errorMessage = "Please enter date in YYYY-MM-DD format";
        }
        updatedBookingData.fromDate = value;
        nextStep = 'toDate';
        break;
      case 'toDate':
        if (!validateDate(value)) {
          isValid = false;
          errorMessage = "Please enter date in YYYY-MM-DD format";
        }
        updatedBookingData.toDate = value;
        nextStep = 'numDays';
        break;
      case 'numDays':
        if (isNaN(Number(value)) || Number(value) < 1) {
          isValid = false;
          errorMessage = "Please enter a valid number of days";
        }
        updatedBookingData.numDays = value;
        nextStep = 'confirmation';
        break;
      case 'confirmation':
        const userInput = value.toLowerCase().trim();
        if (userInput === 'confirm') {
          botSay("Perfect! Processing your booking and redirecting to payment...");
          setTimeout(() => {
            navigate('/payment', {
              state: {
                bookingDetails: updatedBookingData
              }
            });
          }, 2000);
          
          // Reset booking state
          setBookingMode(false);
          setBookingStep('destination');
          setBookingData({ ...initialBookingData });
          return;
        } else if (userInput === 'edit') {
          botSay("Which detail would you like to edit? Please tell me what you'd like to change (e.g., 'change destination', 'change date', etc.)");
          return;
        } else {
          botSay("Please type 'confirm' to proceed with payment or 'edit' to make changes to your booking details.");
          return;
        }
      default:
        break;
    }

    if (!isValid) {
      botSay(errorMessage);
      return;
    }

    setBookingData(updatedBookingData);

    if (nextStep === 'confirmation') {
      setTimeout(() => {
        showBookingConfirmation(updatedBookingData);
        setBookingStep(nextStep);
      }, 400);
    } else {
      setTimeout(() => {
        const q = bookingQuestions.find(q => q.step === nextStep);
        if (q) botSay(q.question);
        setBookingStep(nextStep);
      }, 400);
    }
  };

  return {
    messages,
    bookingMode,
    bookingStep,
    bookingData,
    setBookingMode,
    setBookingStep,
    addUserMessage,
    botSay,
    handleBookingInput,
  };
};
