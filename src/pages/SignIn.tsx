
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SignInForm from '@/components/SignInForm';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          <SignInForm />
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
