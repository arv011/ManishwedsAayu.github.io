import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/g1.jpeg";
import { Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero = () => {
  const weddingDate = new Date("2025-12-06T16:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center animate-hero-zoom"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/70" />
      </div>
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <Heart className="mb-8 h-16 w-16 animate-float-heart text-white drop-shadow-lg" />
        
        <h1 className="mb-4 animate-fade-in font-playfair text-6xl font-bold md:text-8xl">
          Manish & Aayushi
        </h1>
        
        <p className="mb-8 animate-fade-in font-sans text-xl md:text-2xl" style={{ animationDelay: "0.2s" }}>
          December 6th, 2025
        </p>

        <div className="mb-12 flex gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col items-center rounded-lg bg-white/20 backdrop-blur-sm px-6 py-4">
            <span className="text-4xl font-bold">{timeLeft.days}</span>
            <span className="text-sm">Days</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/20 backdrop-blur-sm px-6 py-4">
            <span className="text-4xl font-bold">{timeLeft.hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/20 backdrop-blur-sm px-6 py-4">
            <span className="text-4xl font-bold">{timeLeft.minutes}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white/20 backdrop-blur-sm px-6 py-4">
            <span className="text-4xl font-bold">{timeLeft.seconds}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>

        <Button 
          onClick={scrollToEvents}
          size="lg"
          className="animate-fade-in bg-white text-primary hover:bg-white/90"
          style={{ animationDelay: "0.6s" }}
        >
          View Events
        </Button>
      </div>
    </section>
  );
};

export default Hero;
