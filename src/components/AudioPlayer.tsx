
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl: string;
  isActive: boolean;
  className?: string;
}

const AudioPlayer = ({ audioUrl, isActive, className }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Create audio element
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
    });
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [audioUrl]);
  
  // Auto-pause when inactive
  useEffect(() => {
    if (!isActive && isPlaying) {
      handleTogglePlay();
    }
    // We don't restart play when becoming active to give user control
  }, [isActive]);
  
  // Track progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPlaying]);
  
  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  return (
    <div className={cn("flex items-center space-x-2 bg-black/40 backdrop-blur-md p-3 rounded-full", className)}>
      <button 
        onClick={handleTogglePlay}
        className="rounded-full bg-white text-black p-2 hover:bg-white/90 transition-colors"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      
      <div className="hidden sm:flex items-center space-x-2">
        <Volume2 size={16} className="text-white/70" />
        
        <div className="w-32 lg:w-48 h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white"
            style={{ width: `${(progress / duration) * 100}%` }}
          />
        </div>
        
        <span className="text-xs text-white/70">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
