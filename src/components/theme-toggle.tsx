
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 500);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative z-10"
      >
        <Sun
          className={`h-5 w-5 transition-all ${
            theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute h-5 w-5 transition-all ${
            theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Day/Night animation elements */}
      {theme === "light" && isAnimating && (
        <>
          {/* Sun rays animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-300 rounded-full animate-pulse z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-0">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-6 bg-yellow-300 origin-bottom animate-pulse"
                  style={{ 
                    transform: `rotate(${i * 45}deg) translateY(-12px)` 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </>
      )}

      {theme === "dark" && isAnimating && (
        <>
          {/* Stars animation */}
          <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/4 -translate-y-1/4 overflow-hidden z-0">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className={`absolute w-1 h-1 bg-white rounded-full animate-twinkle-delay-${i % 3}`}
                style={{ 
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              ></div>
            ))}
            {/* Moon */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gray-100 rounded-full shadow-[inset_-3px_-3px_0px_0px_rgba(0,0,0,0.2)]"></div>
          </div>
        </>
      )}
    </div>
  );
}
