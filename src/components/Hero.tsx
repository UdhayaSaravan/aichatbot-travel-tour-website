
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          alt="Mountain landscape with sunrays"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Explore the world's most breathtaking destinations
          </p>
          
          <div className="bg-white rounded-lg p-4 flex items-center gap-4 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="flex-1 border-none outline-none text-gray-800"
            />
            <Button className="bg-primary-accent hover:bg-primary-accent/90 text-white">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
