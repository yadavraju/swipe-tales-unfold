
import { useEffect, useState } from "react";
import { Story } from "@/data/stories";
import AudioPlayer from "./AudioPlayer";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StoryViewProps {
  story: Story;
  isActive: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const StoryView = ({ story, isActive, style, className }: StoryViewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showGuides, setShowGuides] = useState(true);
  
  // Hide guides after first view
  useEffect(() => {
    if (showGuides) {
      const timer = setTimeout(() => {
        setShowGuides(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showGuides]);
  
  // Reset guides when story changes
  useEffect(() => {
    setShowGuides(true);
  }, [story.id]);
  
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-300",
        isActive ? "opacity-100" : "opacity-0",
        className
      )}
      style={style}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        {/* Image with fade-in effect */}
        <img
          src={story.imageUrl}
          alt={story.title}
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
  );
};

export default StoryView;
