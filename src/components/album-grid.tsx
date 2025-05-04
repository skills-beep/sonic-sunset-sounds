
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export function AlbumCard({ album, className }: AlbumCardProps) {
  return (
    <Link 
      to={`/album/${album.id}`}
      className={cn(
        "group p-3 rounded-md bg-card/50 hover:bg-card/80 transition-colors duration-300",
        className
      )}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-md shadow-sm">
        <img 
          src={album.coverUrl} 
          alt={`${album.title} by ${album.artist}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play fill="white" size={24} className="text-white ml-1" />
          </button>
        </div>
      </div>
      <h3 className="font-medium truncate">{album.title}</h3>
      <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
    </Link>
  );
}
