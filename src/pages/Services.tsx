
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair font-bold mb-8">Our Services</h1>
        <p className="text-gray-600 max-w-2xl">
          We offer a wide range of travel services including tour planning, 
          accommodation booking, transportation arrangements, and personalized travel consulting.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
