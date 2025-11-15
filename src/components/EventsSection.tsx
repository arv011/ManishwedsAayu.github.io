import EventCard from "./EventCard";
import { Heart, Music, Wine } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EventsSection = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 });
  
  const events = [
    {
      icon: Heart,
      title: "Maayra",
      date: "December 5th, 2025",
      time: "1:00 PM onwards",
      location: "Hotel Sunshine Park, D-1 Chandar Nagar Opp, vivek vihar, sahibabad-201010"
    },{
      icon: Music,
      title: "Engagement & Sangeet",
      date: "December 5th, 2025",
      time: "6:00 PM onwards",
      location: "Hotel Sunshine Park, D-1 Chandar Nagar Opp, vivek vihar, sahibabad-201010"
    },
    {
      icon: Heart,
      title: "Haldi",
      date: "December 6th, 2025",
      time: "11:00 AM",
      location: "Hotel Sunshine Park, D-1 Chandar Nagar Opp, vivek vihar, sahibabad-201010"
    },    {
      icon: Wine,
      title: "Wedding Ceremony",
      date: "December 6th, 2025",
      time: "Starts from 7:00 PM",
      location: "Radha Palace,Unity One mall, CBD Ground near, Karkardooma court, Delhi-110032"
    }
  ];

  return (
    <section id="events" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={titleAnimation.ref}>
          <h2 className={`text-5xl font-playfair font-bold text-center mb-16 text-primary transition-all duration-700 ${
            titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Celebration Events
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const cardAnimation = useScrollAnimation({ threshold: 0.2 });
            
            return (
              <div 
                key={index}
                ref={cardAnimation.ref}
                className={`transition-all duration-700 will-animate ${
                  cardAnimation.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <EventCard {...event} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
