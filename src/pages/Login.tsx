
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <LoginForm />
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signin" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
