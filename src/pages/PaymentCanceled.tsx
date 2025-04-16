
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Canceled</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your payment was canceled. No charges were made.
        </p>
        <Button onClick={() => navigate(-1)}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default PaymentCanceled;
