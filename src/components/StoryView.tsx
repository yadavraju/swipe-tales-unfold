
import { useEffect, useState } from "react";
import { Story } from "@/data/stories";
import AudioPlayer from "./AudioPlayer";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";

interface StoryViewProps {
  story: Story;
  isActive: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const StoryView = ({ story, isActive, style, className }: StoryViewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showGuides, setShowGuides] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Hide guides after first view
  useEffect(() => {
    if (showGuides) {
      const timer = setTimeout(() => {
        setShowGuides(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showGuides]);
  
  // Reset guides and image index when story changes
  useEffect(() => {
    setShowGuides(true);
    setCurrentImageIndex(0);
    setImageLoaded(false);
  }, [story.id]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < story.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setImageLoaded(false);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
      setImageLoaded(false);
    }
  };
  
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-300 flex items-center justify-center",
        isActive ? "opacity-100" : "opacity-0",
        className
      )}
      style={style}
    >
      {/* 9:16 Container */}
      <div className="relative mx-auto h-full max-w-[calc(9/16*100vh)] bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          {/* Image with fade-in effect */}
          <img
            src={story.images[currentImageIndex]}
            alt={`${story.title} - Image ${currentImageIndex + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-white animate-spin" />
            </div>
          )}
        </div>
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
          {/* Top section with swipe guides */}
          <div className={cn(
            "relative flex items-center justify-center",
            isActive && showGuides ? "swipe-active" : ""
          )}>
            <div className="swipe-indicator swipe-indicator-left left-8">
              <ChevronLeft size={24} />
            </div>
            <div className="swipe-indicator swipe-indicator-right right-8">
              <ChevronRight size={24} />
            </div>
          </div>
          
          {/* Image Carousel Indicators */}
          <div className="absolute top-4 left-0 right-0">
            <div className="flex justify-center gap-1.5">
              {story.images.map((_, index) => (
                <button 
                  key={index} 
                  className="p-1 focus:outline-none"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {index === currentImageIndex ? (
                    <CircleDot size={12} className="text-white" />
                  ) : (
                    <Circle size={12} className="text-white/60" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Image Navigation Controls */}
          {story.images.length > 1 && (
            <>
              {currentImageIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1.5 text-white/80 hover:text-white hover:bg-black/50 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {currentImageIndex < story.images.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1.5 text-white/80 hover:text-white hover:bg-black/50 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </>
          )}
          
          {/* Bottom section with content */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-shadow">{story.title}</h2>
            <p className="text-sm sm:text-base text-white/90 max-w-md text-shadow line-clamp-3 sm:line-clamp-none">
              {story.description}
            </p>
            <AudioPlayer audioUrl={story.audioUrl} isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryView;
