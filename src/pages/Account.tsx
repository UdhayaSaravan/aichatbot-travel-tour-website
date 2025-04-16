
import React from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from '../contexts/UserContext';

// Mock data for demonstration - in a real app, this would come from your backend
const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  bookings: [
    {
      id: 1,
      destination: "Paris",
      startDate: "2024-05-01",
      endDate: "2024-05-07",
      guests: { adults: 2, children: 1 }
    },
    {
      id: 2,
      destination: "London",
      startDate: "2024-06-15",
      endDate: "2024-06-20",
      guests: { adults: 2, children: 0 }
    }
  ]
};

const Account = () => {
  const { userEmail } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Account Details</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="font-medium">Name:</label>
                <p>{mockUserData.name}</p>
              </div>
              <div>
                <label className="font-medium">Email:</label>
                <p>{userEmail || mockUserData.email}</p>
              </div>
              <div>
                <label className="font-medium">Age:</label>
                <p>{mockUserData.age}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Travel History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserData.bookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{booking.destination}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.startDate} to {booking.endDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Guests: {booking.guests.adults} adults, {booking.guests.children} children
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
