
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-playfair font-bold mb-8">About Us</h1>
        <p className="text-gray-600 max-w-2xl">
          We are passionate about helping travelers discover the world's most amazing destinations. 
          Our team is dedicated to creating unforgettable travel experiences.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
