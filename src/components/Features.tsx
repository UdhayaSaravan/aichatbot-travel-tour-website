
import { Shield, Clock, Heart, Trophy } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Safe Travel",
      description: "Your safety is our top priority with 24/7 support"
    },
    {
      icon: Clock,
      title: "Flexible Booking",
      description: "Change your plans with free cancellation options"
    },
    {
      icon: Heart,
      title: "Handpicked Hotels",
      description: "Stay at the best hotels and resorts worldwide"
    },
    {
      icon: Trophy,
      title: "Best Price Guarantee",
      description: "We offer the most competitive prices on the market"
    }
  ];

  return (
    <section className="py-16 bg-primary/20">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
                <feature.icon className="w-8 h-8 text-primary-accent" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
