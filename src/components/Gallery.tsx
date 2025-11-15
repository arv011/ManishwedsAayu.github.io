import { useState } from "react";
import gallery1 from "@/assets/g1.jpeg";
import gallery2 from "@/assets/g2.jpeg";
import gallery3 from "@/assets/g3.jpeg";
import gallery4 from "@/assets/g4.jpeg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const titleAnimation = useScrollAnimation({ threshold: 0.3 });
  
  const images = [
    { src: gallery1, alt: "Dancing under the lights", animation: "animate-slide-in-left" },
    { src: gallery2, alt: "Wedding venue decoration", animation: "animate-slide-in-up" },
    { src: gallery3, alt: "Couple in the field", animation: "animate-zoom-rotate" },
    { src: gallery4, alt: "Wedding invitation", animation: "animate-slide-in-right" },
  ];

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={titleAnimation.ref}>
          <h2 className={`text-5xl font-playfair font-bold text-center mb-16 text-primary transition-all duration-700 ${
            titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Moments
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => {
            const imageAnimation = useScrollAnimation({ threshold: 0.2 });
            
            return (
              <div 
                key={index}
                ref={imageAnimation.ref}
                className={`group relative overflow-hidden rounded-xl cursor-pointer aspect-square opacity-0 will-animate ${
                  imageAnimation.isVisible ? image.animation : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Gallery image" 
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
