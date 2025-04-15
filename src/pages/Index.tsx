
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import DestinationCard from "@/components/DestinationCard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    title: "Swiss Alps",
    location: "Switzerland",
    price: "From $1,299"
  },
  {
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    title: "Tropical Paradise",
    location: "Bali, Indonesia",
    price: "From $899"
  },
  {
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    title: "Northern Lights",
    location: "Iceland",
    price: "From $1,499"
  },
  {
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    title: "Beach Retreat",
    location: "Maldives",
    price: "From $2,299"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our handpicked selection of stunning destinations and start planning your next unforgettable journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>
      
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
