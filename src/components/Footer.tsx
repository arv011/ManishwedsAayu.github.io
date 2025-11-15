import { Heart, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2 text-2xl font-playfair text-primary">
            <Heart className="h-6 w-6" />
            <span>With love, Manish & Aayushi</span>
            <Heart className="h-6 w-6" />
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/20"
              asChild
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/20"
              asChild
            >
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={scrollToTop}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Back to Top ↑
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            © 2025 Manish & Aayushi. All rights reserved. Made by Arvind Shrivastava 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
