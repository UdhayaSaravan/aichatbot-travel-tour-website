
export type BookingStep =
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

export interface Message {
  content: string;
  isUser: boolean;
}

export interface BookingData {
  destination: string;
  name: string;
  email: string;
  age: string;
  numPeople: string;
  fromDate: string;
  toDate: string;
  numDays: string;
}
