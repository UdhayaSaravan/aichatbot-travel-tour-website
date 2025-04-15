
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Logic = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair font-bold mb-8">Our Logic</h1>
        <p className="text-gray-600 max-w-2xl">
          We leverage advanced technologies and data-driven approaches 
          to provide the most efficient and personalized travel solutions.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Logic;
