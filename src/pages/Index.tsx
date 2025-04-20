import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Place from "@/components/Place";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const places = [
  {
    id: "goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    title: "Goa",
    description: "Beach Paradise of India",
    price: "From $599"
  },
  {
    id: "london",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    title: "London",
    description: "Historical Capital of England",
    price: "From $899"
  },
  {
    id: "france",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    title: "Paris",
    description: "City of Love, France",
    price: "From $799"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our handpicked selection of stunning destinations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {places.map((place) => (
              <Place key={place.id} {...place} />
            ))}
          </div>
        </div>
      </section>
      
      <Features />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
