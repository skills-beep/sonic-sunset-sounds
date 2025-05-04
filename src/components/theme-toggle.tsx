
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 300);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative z-10 h-10 w-10 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/70"
      >
        <div className="relative h-6 w-6">
          <Sun
            className={cn(
              "absolute inset-0 h-6 w-6 rotate-0 scale-100 transition-all duration-300",
              theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            )}
          />
          <Moon
            className={cn(
              "absolute inset-0 h-6 w-6 rotate-90 scale-0 transition-all duration-300",
              theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            )}
          />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Animation ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-500",
          isAnimating ? "scale-[2] opacity-0" : "scale-100 opacity-0",
          theme === "dark" 
            ? "bg-gradient-to-r from-indigo-500 to-purple-500" 
            : "bg-gradient-to-r from-yellow-300 to-orange-400"
        )}
      />
    </div>
  );
}
