
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

interface AlbumGridProps {
  title: string;
  albums: Album[];
  className?: string;
}

export function AlbumGrid({ title, albums, className }: AlbumGridProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}

interface AlbumCardProps {
  album: Album;
  className?: string;
  isPlaying?: boolean;
}

export function AlbumCard({ album, className, isPlaying = false }: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/album/${album.id}`}
      className={cn(
        "group p-3 rounded-md glass-effect hover:bg-card/80 transition-all duration-300",
        isHovered && "shadow-lg translate-y-[-2px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md shadow-sm">
        <div className={cn(
          "relative w-full h-full overflow-hidden",
          isPlaying && "animate-spin-slow"
        )}>
          <img 
            src={album.coverUrl} 
            alt={`${album.title} by ${album.artist}`} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered && "scale-110"
            )}
          />
        </div>
        <div className={cn(
          "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
          isPlaying && "opacity-50"
        )}>
          <button className={cn(
            "w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300",
            isHovered ? "translate-y-0 scale-100" : "translate-y-4 scale-90",
            "hover:scale-110"
          )}>
            <Play fill="white" size={24} className="text-white ml-1" />
          </button>
        </div>
        
        {/* Playback animation */}
        {isPlaying && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-0.5 h-4 bg-white rounded-full"
                  style={{
                    animation: `waveform 0.5s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.1}s`,
                    transform: `scaleY(${0.3 + Math.random() * 0.7})`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      <h3 className="font-medium truncate">{album.title}</h3>
      <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
    </Link>
  );
}
