
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { toast } from 'sonner';

type BookingStep =
  | 'destination'
  | 'name'
  | 'email'
  | 'age'
  | 'numPeople'
  | 'fromDate'
  | 'toDate'
  | 'numDays'
  | 'confirmation'
  | 'done';

interface Message {
  content: string;
  isUser: boolean;
}

interface BookingData {
  destination: string;
  name: string;
  email: string;
  age: string;
  numPeople: string;
  fromDate: string;
  toDate: string;
  numDays: string;
}

const initialBookingData: BookingData = {
  destination: "",
  name: "",
  email: "",
  age: "",
  numPeople: "",
  fromDate: "",
  toDate: "",
  numDays: "",
};

const destinations = ["Goa", "London", "Paris"];

function isBookIntent(text: string) {
  return text.toLowerCase().includes('book ticket');
}

const bookingQuestions: { step: BookingStep, question: string }[] = [
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

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I help you today?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingMode, setBookingMode] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('destination');
  const [bookingData, setBookingData] = useState<BookingData>({ ...initialBookingData });

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, { content, isUser: true }]);
  };

  const botSay = (content: string) => {
    setMessages(prev => [...prev, { content, isUser: false }]);
  };

  const validateDestination = (value: string) => {
    return destinations.some(dest => 
      dest.toLowerCase() === value.toLowerCase()
    );
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateDate = (date: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addUserMessage(newMessage);

    if (bookingMode) {
      handleBookingInput(newMessage.trim());
    } else if (isBookIntent(newMessage)) {
      setBookingMode(true);
      setBookingStep('destination');
      botSay(bookingQuestions[0].question);
    } else {
      setTimeout(() => {
        botSay("Thanks for your message! Our team will get back to you soon.");
      }, 800);
    }
    setNewMessage('');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Chat with us</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full max-h-screen pt-4">
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                bookingMode
                  ? bookingStep === 'confirmation'
                    ? "Type 'confirm' or 'edit'..."
                    : bookingQuestions.find(q => q.step === bookingStep)?.question ?? "Your answer..."
                  : "Type your message..."
              }
              className="flex-1"
              required
              autoComplete="off"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;
