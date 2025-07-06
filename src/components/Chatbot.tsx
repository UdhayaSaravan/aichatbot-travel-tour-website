
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
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
import { useBookingLogic } from './chatbot/useBookingLogic';
import { isBookIntent, bookingQuestions } from './chatbot/constants';

const Chatbot = () => {
  const [newMessage, setNewMessage] = useState('');
  const {
    messages,
    bookingMode,
    bookingStep,
    setBookingMode,
    setBookingStep,
    addUserMessage,
    botSay,
    handleBookingInput,
  } = useBookingLogic();

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
