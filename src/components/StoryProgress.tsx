
import { cn } from "@/lib/utils";

interface StoryProgressProps {
  totalStories: number;
  currentIndex: number;
  className?: string;
}

const StoryProgress = ({ totalStories, currentIndex, className }: StoryProgressProps) => {
  return (
    <div className={cn("flex gap-1.5", className)}>
      {Array.from({ length: totalStories }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1 rounded-full transition-all duration-300 flex-grow",
            currentIndex === index
              ? "bg-white/90"
              : currentIndex > index
              ? "bg-white/80"
              : "bg-white/30"
          )}
        />
      ))}
    </div>
  );
};

export default StoryProgress;
