
import { useTheme } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import { SearchBar } from "@/components/search-bar";
import { AlbumGrid } from "@/components/album-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// Mock data for featured albums
const featuredAlbums = [
  {
    id: "1",
    title: "Midnight Tales",
    artist: "Luna Echo",
    coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: "2",
    title: "Summer Beats",
    artist: "Solar Groove",
    coverUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  },
  {
    id: "3",
    title: "Acoustic Journey",
    artist: "Forest Whispers",
    coverUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  {
    id: "4",
    title: "Electric Dreams",
    artist: "Neon Wave",
    coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
  },
  {
    id: "5",
    title: "Chill Vibes",
    artist: "Zen Flow",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
];

// Mock data for recent albums
const recentAlbums = [
  {
    id: "6",
    title: "Urban Echoes",
    artist: "City Sounds",
    coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: "7",
    title: "Digital Waves",
    artist: "Binary Beat",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: "8",
    title: "Morning Coffee",
    artist: "Sunrise Sessions",
    coverUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: "9",
    title: "Cosmic Journey",
    artist: "Galaxy Travelers",
    coverUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: "10",
    title: "Rainy Days",
    artist: "Storm Chasers",
    coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

const Index = () => {
  const { theme } = useTheme();
  
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
          <div className="p-4 glass-effect border-b flex items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" className="rounded-full">
                  {"<"}
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  {">"}
                </Button>
              </div>
              <div className="w-full max-w-md">
                <SearchBar />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline">Sign Up</Button>
              <Button>Log In</Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AlbumGrid title="Featured Albums" albums={featuredAlbums} className="mb-8" />
            <AlbumGrid title="Recently Played" albums={recentAlbums} className="mb-8" />
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

export default Index;
