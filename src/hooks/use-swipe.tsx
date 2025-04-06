
import { useState, useRef, useEffect } from "react";

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

interface SwipeState {
  touchStart: number | null;
  touchEnd: number | null;
  direction: 'left' | 'right' | null;
  swiping: boolean;
  distance: number;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeProps = {}) {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    touchStart: null,
    touchEnd: null,
    direction: null,
    swiping: false,
    distance: 0,
  });

  // Refs for mouse events
  const mouseDown = useRef(false);
  
  // Start swipe handler
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    if ('button' in e && e.button !== 0) return; // Only handle left mouse button
    
    if ('button' in e) mouseDown.current = true;
    
    setSwipeState(prev => ({
      ...prev,
      touchStart: clientX,
      touchEnd: null,
      swiping: true,
      distance: 0,
    }));
  };

  // During swipe handler
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swipeState.touchStart) return;
    if ('touches' in e === false && mouseDown.current === false) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = clientX - swipeState.touchStart;
    const direction = distance > 0 ? 'right' : 'left';
    
    setSwipeState(prev => ({
      ...prev,
      touchEnd: clientX,
      direction,
      distance,
    }));
  };

  // End swipe handler
  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if ('button' in e) mouseDown.current = false;
    
    if (!swipeState.touchStart || !swipeState.touchEnd) {
      setSwipeState(prev => ({ ...prev, swiping: false, distance: 0 }));
      return;
    }

    const distance = Math.abs(swipeState.distance);
    if (distance > threshold) {
      if (swipeState.direction === 'left' && onSwipeLeft) {
        onSwipeLeft();
      } else if (swipeState.direction === 'right' && onSwipeRight) {
        onSwipeRight();
      }
    }

    setSwipeState({
      touchStart: null,
      touchEnd: null,
      direction: null,
      swiping: false,
      distance: 0,
    });
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && onSwipeRight) {
        onSwipeRight();
      } else if (e.key === 'ArrowRight' && onSwipeLeft) {
        onSwipeLeft();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSwipeLeft, onSwipeRight]);

  const bindSwipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleTouchStart,
    onMouseMove: handleTouchMove,
    onMouseUp: handleTouchEnd,
    onMouseLeave: handleTouchEnd,
  };

  return {
    bindSwipeHandlers,
    swipeState,
  };
}
