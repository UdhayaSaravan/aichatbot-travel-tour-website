import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronLeft } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const places = {
  goa: {
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    title: "Goa",
    description: "Experience the vibrant beach life and rich Portuguese heritage in India's most popular coastal destination. Enjoy pristine beaches, water sports, historic churches, and amazing seafood.",
    price: "From $599"
  },
  london: {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    title: "London",
    description: "Discover the magic of London with its iconic landmarks, royal heritage, world-class museums, and diverse cultural experiences. Visit Big Ben, Tower Bridge, and Buckingham Palace.",
    price: "From $899"
  },
  france: {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    title: "Paris",
    description: "Fall in love with the City of Light. Experience the romance of Eiffel Tower, explore world-famous museums like the Louvre, and indulge in exquisite French cuisine.",
    price: "From $799"
  }
};

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = id ? places[id as keyof typeof places] : null;

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img 
              src={place.image} 
              alt={place.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{place.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{place.title}</span>
            </div>
            <p className="text-gray-600 mb-6">{place.description}</p>
            <p className="text-2xl font-bold text-primary mb-6">{place.price}</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg">Book Now</Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Book your stay at {place.title}</SheetTitle>
                  <SheetDescription>
                    Fill in the details below to book your perfect vacation.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <BookingForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlaceDetail;
