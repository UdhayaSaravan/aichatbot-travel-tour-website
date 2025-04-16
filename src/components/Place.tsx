
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

interface PlaceProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

const Place = ({ id, image, title, description, price }: PlaceProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={() => navigate(`/place/${id}`)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {description}
        </p>
        <p className="text-primary font-semibold">{price}</p>
      </CardContent>
    </Card>
  );
};

export default Place;
