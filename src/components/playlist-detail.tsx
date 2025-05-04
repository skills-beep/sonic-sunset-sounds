
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumTitle?: string;
}

interface PlaylistDetailProps {
  title: string;
  description?: string;
  coverUrl: string;
  createdBy?: string;
  totalTracks: number;
  duration?: string;
  tracks: Track[];
  className?: string;
}

export function PlaylistDetail({
  title,
  description,
  coverUrl,
  createdBy,
  totalTracks,
  duration,
  tracks,
  className,
}: PlaylistDetailProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 pb-6">
        <div className="w-48 h-48 flex-shrink-0 shadow-lg rounded-md overflow-hidden">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-sm uppercase font-medium mb-2">Playlist</div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-muted-foreground mb-4 max-w-2xl">{description}</p>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            {createdBy && <span className="font-medium text-foreground">{createdBy} • </span>}
            <span>{totalTracks} songs</span>
            {duration && <span>, {duration}</span>}
          </div>
        </div>
      </div>

      <div className="py-5 flex items-center gap-4">
        <Button className="rounded-full bg-spotify-green hover:bg-spotify-green/90 text-white h-12 w-12 p-0">
          <Play fill="white" size={24} className="ml-1" />
        </Button>
      </div>

      <div className="border-b border-border py-2">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-muted-foreground text-sm border-b border-border">
              <th className="py-3 px-4 text-left font-medium w-8">#</th>
              <th className="py-3 px-4 text-left font-medium">Title</th>
              <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Album</th>
              <th className="py-3 px-4 text-right font-medium w-20">Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr key={track.id} className="group hover:bg-card/50 transition-colors">
                <td className="py-2 px-4 text-center text-muted-foreground">
                  {index + 1}
                </td>
                <td className="py-2 px-4">
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  </div>
                </td>
                <td className="py-2 px-4 hidden md:table-cell text-muted-foreground">
                  {track.albumTitle}
                </td>
                <td className="py-2 px-4 text-right text-muted-foreground">
                  {track.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
