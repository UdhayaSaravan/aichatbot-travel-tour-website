import React, { useState } from 'react';
import { MessageCircle, Calendar, User, Ticket, Mail } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type BookingStep =
  | 'name'
  | 'email'
  | 'age'
  | 'numPeople'
  | 'fromDate'
  | 'toDate'
  | 'numDays'
  | 'done';

interface Message {
  content: string;
  isUser: boolean;
}

interface BookingData {
  name: string;
  email: string;
  age: string;
  numPeople: string;
  fromDate: string;
  toDate: string;
  numDays: string;
}

const initialBookingData: BookingData = {
  name: "",
  email: "",
  age: "",
  numPeople: "",
  fromDate: "",
  toDate: "",
  numDays: "",
};

function isBookIntent(text: string) {
  return text.toLowerCase().includes('book ticket');
}

const bookingQuestions: { step: BookingStep, question: string }[] = [
  { step: 'name', question: "What's your name?" },
  { step: 'email', question: "What's your email address?" },
  { step: 'age', question: "What's your age?" },
  { step: 'numPeople', question: "How many people are booking?" },
  { step: 'fromDate', question: "What is the start date? (YYYY-MM-DD)" },
  { step: 'toDate', question: "What is the end date? (YYYY-MM-DD)" },
  { step: 'numDays', question: "How many days?" },
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! How can I help you today?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [bookingMode, setBookingMode] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('name');
  const [bookingData, setBookingData] = useState<BookingData>({ ...initialBookingData });

  // When the user submits a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addUserMessage(newMessage);

    // Booking flow
    if (bookingMode) {
      handleBookingInput(newMessage.trim());
    } else if (isBookIntent(newMessage)) {
      // "book ticket" intent detected
      setBookingMode(true);
      setBookingStep('name');
      botSay(bookingQuestions[0].question);
    } else {
      // Default reply for general queries
      setTimeout(() => {
        botSay("Thanks for your message! Our team will get back to you soon.");
      }, 800);
    }
    setNewMessage('');
  };

  // Helper: add a user message to chat
  function addUserMessage(content: string) {
    setMessages(prev => [...prev, { content, isUser: true }]);
  }

  // Helper: add a bot message to chat
  function botSay(content: string) {
    setMessages(prev => [...prev, { content, isUser: false }]);
  }

  // Sequentially handle each booking answer
  function handleBookingInput(value: string) {
    let nextStep: BookingStep = bookingStep;
    let updatedBookingData = { ...bookingData };
    switch (bookingStep) {
      case 'name':
        updatedBookingData.name = value;
        nextStep = 'email';
        break;
      case 'email':
        updatedBookingData.email = value;
        nextStep = 'age';
        break;
      case 'age':
        updatedBookingData.age = value;
        nextStep = 'numPeople';
        break;
      case 'numPeople':
        updatedBookingData.numPeople = value;
        nextStep = 'fromDate';
        break;
      case 'fromDate':
        updatedBookingData.fromDate = value;
        nextStep = 'toDate';
        break;
      case 'toDate':
        updatedBookingData.toDate = value;
        nextStep = 'numDays';
        break;
      case 'numDays':
        updatedBookingData.numDays = value;
        nextStep = 'done';
        break;
      case 'done':
        // No further questions
        break;
      default:
        break;
    }
    setBookingData(updatedBookingData);

    if (nextStep === 'done') {
      // Booking is complete, display summary and inform for payment
      setTimeout(() => {
        botSay(
          `Booking complete! Here are your details:\n\n` +
          `Name: ${updatedBookingData.name}\n` +
          `Email: ${updatedBookingData.email}\n` +
          `Age: ${updatedBookingData.age}\n` +
          `People: ${updatedBookingData.numPeople}\n` +
          `From: ${updatedBookingData.fromDate}\n` +
          `To: ${updatedBookingData.toDate}\n` +
          `Days: ${updatedBookingData.numDays}\n\n` +
          "Please proceed to payment to complete your booking."
        );
        // Reset form, optionally keep bookingMode active to enable new bookings
        setBookingMode(false);
        setBookingStep('name');
        setBookingData({ ...initialBookingData });
      }, 800);
    } else {
      setTimeout(() => {
        const q = bookingQuestions.find(q => q.step === nextStep);
        if (q) botSay(q.question);
        setBookingStep(nextStep);
      }, 400);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed top-4 right-4 rounded-full w-12 h-12 p-0 bg-primary hover:bg-primary/90 z-[51]"
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
                  ? bookingQuestions.find(q => q.step === bookingStep)?.question ?? "Your answer..."
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
