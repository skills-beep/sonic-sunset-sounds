
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";

interface PlayerProps {
  className?: string;
}

export function Player({ className }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const songDuration = 217; // Duration in seconds
  
  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={cn("flex items-center justify-between w-full p-3 bg-card border-t border-border", className)}>
      {/* Current Song Info */}
      <div className="flex items-center w-1/4 min-w-[180px]">
        <div className="w-12 h-12 rounded bg-muted flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
            alt="Album Cover"
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="ml-3 truncate">
          <div className="font-medium text-sm truncate">Sunset Dreams</div>
          <div className="text-xs text-muted-foreground truncate">Chill Artist</div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-xl px-4">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <button className="p-1.5 hover:text-primary transition">
            <Shuffle size={18} />
          </button>
          <button className="p-1.5 hover:text-primary transition">
            <SkipBack size={18} />
          </button>
          <button 
            className="p-2 bg-white dark:bg-primary rounded-full hover:scale-105 transition flex items-center justify-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} className="text-black dark:text-white" /> : <Play size={20} className="text-black dark:text-white" />}
          </button>
          <button className="p-1.5 hover:text-primary transition">
            <SkipForward size={18} />
          </button>
          <button className="p-1.5 hover:text-primary transition">
            <Repeat size={18} />
          </button>
        </div>
        
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-muted-foreground w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider 
            value={[currentTime]} 
            max={songDuration} 
            step={1}
            onValueChange={(values) => setCurrentTime(values[0])}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8">
            {formatTime(songDuration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center w-1/5 min-w-[120px] justify-end space-x-2">
        <Volume2 size={18} className="text-muted-foreground" />
        <Slider 
          value={[volume]} 
          max={100} 
          step={1}
          onValueChange={(values) => setVolume(values[0])}
          className="w-24"
        />
      </div>
    </div>
  );
}
