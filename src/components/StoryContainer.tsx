
import { useState, useRef } from "react";
import { stories } from "@/data/stories";
import StoryView from "./StoryView";
import StoryProgress from "./StoryProgress";
import { useSwipe } from "@/hooks/use-swipe";

const StoryContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const goToPreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  // Set up swipe handlers
  const { bindSwipeHandlers, swipeState } = useSwipe({
    onSwipeLeft: goToNextStory,
    onSwipeRight: goToPreviousStory,
  });
  
  // Calculate transformation based on swipe
  const getTransformStyle = (index: number) => {
    // Base transform for positioning
    let transform = `translateX(${(index - currentIndex) * 100}%)`;
    
    // If actively swiping, add swipe offset
    if (swipeState.swiping && currentIndex === index) {
      transform = `translateX(${swipeState.distance}px)`;
    }
    
    return { transform };
  };
  
  return (
    <div 
      className="fixed inset-0 overflow-hidden touch-none select-none"
      ref={containerRef}
      {...bindSwipeHandlers}
    >
      {/* Story Progress Indicator */}
      <StoryProgress 
        totalStories={stories.length} 
        currentIndex={currentIndex} 
        className="absolute top-0 left-0 right-0 z-10 p-4"
      />
      
      {/* Story Views */}
      <div className="relative h-full">
        {stories.map((story, index) => (
          <StoryView
            key={story.id}
            story={story}
            isActive={index === currentIndex}
            style={getTransformStyle(index)}
            className="transition-transform duration-300"
          />
        ))}
      </div>
      
      {/* Instructions for first time users - shown only on first story */}
      {currentIndex === 0 && (
        <div className="absolute bottom-40 left-0 right-0 text-center text-white/80 text-sm animate-fade-in">
          <p>Swipe left or right to navigate between stories</p>
        </div>
      )}
    </div>
  );
};

export default StoryContainer;
