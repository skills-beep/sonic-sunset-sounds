
import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (previousTheme && previousTheme !== theme) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 2000);
      return () => clearTimeout(timer);
    }
    setPreviousTheme(theme as "light" | "dark");
  }, [theme, previousTheme]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Day background */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000", 
          theme === "light" ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute inset-0 day-background"></div>
        
        {/* Sun */}
        <div 
          className={cn(
            "absolute top-20 right-20 w-40 h-40 transition-all duration-1000 ease-in-out",
            theme === "dark" ? "translate-y-[30vh] opacity-0" : "translate-y-0 opacity-100"
          )}
        >
          <div className="relative w-full h-full">
            {/* Sun circle */}
            <div className="absolute inset-0 bg-yellow-300 rounded-full shadow-[0_0_50px_20px_rgba(255,200,0,0.5)] animate-pulse"></div>
            
            {/* Sun rays */}
            <div className="absolute inset-[-30%] animate-spin-slow">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 h-12 w-1.5 bg-yellow-300/70 shadow-[0_0_10px_3px_rgba(255,200,0,0.3)] origin-bottom rounded-full"
                  style={{ transform: `rotate(${i * 30}deg) translateY(-50px)` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Night background */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000", 
          theme === "dark" ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute inset-0 night-background"></div>
        
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full animate-twinkle`}
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: Math.random() > 0.8 ? '3px' : '1px',
                height: Math.random() > 0.8 ? '3px' : '1px',
              }}
            ></div>
          ))}
        </div>
        
        {/* Moon */}
        <div 
          className={cn(
            "absolute top-20 right-20 w-32 h-32 transition-all duration-1000 ease-in-out",
            theme === "light" ? "translate-y-[-30vh] opacity-0" : "translate-y-0 opacity-100"
          )}
        >
          <div className="w-full h-full bg-gray-200 rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.3)]">
            <div className="absolute top-5 right-7 w-7 h-7 rounded-full bg-gray-300/50"></div>
            <div className="absolute top-16 right-12 w-4 h-4 rounded-full bg-gray-300/50"></div>
            <div className="absolute top-10 left-8 w-6 h-6 rounded-full bg-gray-300/50"></div>
          </div>
        </div>
      </div>

      {/* Transition overlay */}
      {isTransitioning && (
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500", 
          previousTheme === "light" ? "bg-orange-200/30" : "bg-indigo-900/30"
        )}></div>
      )}
    </div>
  );
}
