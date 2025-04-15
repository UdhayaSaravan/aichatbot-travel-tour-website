
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
}

const DestinationCard = ({ image, title, location, price }: DestinationCardProps) => {
  return (
    <div className="group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-playfair text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <p className="text-primary-accent font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
