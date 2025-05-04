
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumCard } from "@/components/album-grid";
import { cn } from "@/lib/utils";

// Mock data for library items
const libraryItems = {
  playlists: [
    {
      id: "chill-vibes",
      title: "Chill Vibes",
      artist: "Your Library",
      coverUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    },
    {
      id: "top-hits-2024",
      title: "Top Hits 2024",
      artist: "Spotify",
      coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    },
    {
      id: "rock-classics",
      title: "Rock Classics",
      artist: "Spotify",
      coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      id: "focus-flow",
      title: "Focus Flow",
      artist: "Spotify",
      coverUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    },
  ],
  albums: [
    {
      id: "a1",
      title: "Midnight Tales",
      artist: "Luna Echo",
      coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    },
    {
      id: "a2",
      title: "Summer Beats",
      artist: "Solar Groove",
      coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
  ],
  artists: [
    {
      id: "artist1",
      title: "Luna Echo",
      artist: "Artist",
      coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      id: "artist2",
      title: "Solar Groove",
      artist: "Artist",
      coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
  ],
};

const LibraryPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("playlists");
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'night-background' : 'day-background'}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 p-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 glass-effect border-b flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" className="rounded-full">
                  {"<"}
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  {">"}
                </Button>
              </div>
              <h1 className="text-xl font-bold">Your Library</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline">Sign Up</Button>
              <Button>Log In</Button>
            </div>
          </div>

          {/* Tabs and Library Content */}
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="playlists" value={activeTab} onValueChange={setActiveTab}>
              <div className="sticky top-0 z-10 glass-effect px-6 py-4 border-b">
                <TabsList>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                  <TabsTrigger value="albums">Albums</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="playlists" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {libraryItems.playlists.map((item) => (
                      <AlbumCard key={item.id} album={item} />
                    ))}
                    <CreateCard type="playlist" />
                  </div>
                </TabsContent>
                
                <TabsContent value="albums" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {libraryItems.albums.map((item) => (
                      <AlbumCard key={item.id} album={item} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="artists" className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {libraryItems.artists.map((item) => (
                      <ArtistCard key={item.id} artist={item} />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Player />
      </div>
    </div>
  );
};

interface ArtistCardProps {
  artist: {
    id: string;
    title: string;
    coverUrl: string;
  };
  className?: string;
}

function ArtistCard({ artist, className }: ArtistCardProps) {
  return (
    <div
      className={cn(
        "group p-3 rounded-md bg-card/50 hover:bg-card/80 transition-colors duration-300",
        className
      )}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-full shadow-sm">
        <img 
          src={artist.coverUrl} 
          alt={artist.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </button>
        </div>
      </div>
      <h3 className="font-medium text-center">{artist.title}</h3>
      <p className="text-sm text-muted-foreground text-center">Artist</p>
    </div>
  );
}

interface CreateCardProps {
  type: "playlist";
}

function CreateCard({ type }: CreateCardProps) {
  return (
    <div className="p-3 rounded-md bg-card/30 hover:bg-card/60 transition-colors duration-300 border border-dashed border-muted-foreground/50 flex flex-col items-center justify-center aspect-square">
      <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center mb-2">
        <span className="text-2xl">+</span>
      </div>
      <p className="font-medium">Create {type}</p>
    </div>
  );
}

export default LibraryPage;
