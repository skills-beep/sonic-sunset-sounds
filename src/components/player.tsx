
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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

  // Simulate song progress when playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTime < songDuration) {
      interval = setInterval(() => {
        setCurrentTime(time => {
          if (time >= songDuration) {
            clearInterval(interval);
            setIsPlaying(false);
            return songDuration;
          }
          return time + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, songDuration]);

  return (
    <div className={cn("flex items-center justify-between w-full p-3 glass-effect border-t border-border/30", className)}>
      {/* Current Song Info */}
      <div className="flex items-center w-1/4 min-w-[180px]">
        <div className={cn(
          "w-12 h-12 rounded overflow-hidden flex-shrink-0 shadow-md",
          isPlaying && "animate-spin-slow"
        )}>
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
            alt="Album Cover"
            className="w-full h-full object-cover"
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
            className="p-2 bg-white/90 dark:bg-primary/90 backdrop-blur-md rounded-full hover:scale-105 transition flex items-center justify-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} className="text-black dark:text-white" /> : <Play size={20} className="text-black dark:text-white ml-0.5" />}
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
          
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <div className="relative flex-1 group">
                <Slider 
                  value={[currentTime]} 
                  max={songDuration} 
                  step={1}
                  onValueChange={(values) => setCurrentTime(values[0])}
                  className="z-10 flex-1"
                />
                
                {/* Audio waveform visualization (visible when playing) */}
                {isPlaying && (
                  <div className="absolute left-0 right-0 bottom-0 top-0 flex items-center justify-start pointer-events-none">
                    <div 
                      className="absolute flex items-center space-x-1 h-8"
                      style={{ left: `${(currentTime / songDuration) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            animation: `waveform 0.6s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.1}s`,
                            height: `${4 + Math.random() * 8}px`,
                          }}
                          className="w-0.5 bg-primary/70 rounded-full"
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-1 text-xs bg-card/90 backdrop-blur-md">
              {formatTime(currentTime)} / {formatTime(songDuration)}
            </HoverCardContent>
          </HoverCard>
          
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
