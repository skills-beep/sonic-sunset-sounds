
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import { SearchBar } from "@/components/search-bar";
import { AlbumGrid, AlbumCard } from "@/components/album-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedBackground } from "@/components/animated-background";
import { cn } from "@/lib/utils";

// Mock data for categories
const categories = [
  { id: "podcasts", name: "Podcasts", color: "bg-orange-500", imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc" },
  { id: "live-events", name: "Live Events", color: "bg-pink-500", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745" },
  { id: "made-for-you", name: "Made For You", color: "bg-blue-500", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f" },
  { id: "new-releases", name: "New Releases", color: "bg-green-500", imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3" },
  { id: "pop", name: "Pop", color: "bg-purple-500", imageUrl: "https://images.unsplash.com/photo-1496092607007-ca33db8d91ca" },
  { id: "hip-hop", name: "Hip-Hop", color: "bg-yellow-500", imageUrl: "https://images.unsplash.com/photo-1611329532992-0b7b51df6476" },
  { id: "rock", name: "Rock", color: "bg-red-500", imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee" },
  { id: "indie", name: "Indie", color: "bg-indigo-500", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4" },
];

// Mock search results
const searchResults = {
  albums: [
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
  ],
  artists: [
    {
      id: "a1",
      title: "Luna Echo",
      artist: "Artist",
      coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      id: "a2",
      title: "Solar Groove",
      artist: "Artist",
      coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
  ],
  playlists: [
    {
      id: "p1",
      title: "Chill Vibes",
      artist: "Spotify",
      coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    },
    {
      id: "p2",
      title: "Top Hits 2024",
      artist: "Spotify",
      coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    },
  ],
};

const SearchPage = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // In a real app, you would fetch search results here
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 p-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 glass-effect sticky top-0 z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" className="rounded-full bg-background/40 backdrop-blur-md">
                  {"<"}
                </Button>
                <Button size="icon" variant="outline" className="rounded-full bg-background/40 backdrop-blur-md">
                  {">"}
                </Button>
              </div>
              <div className="w-full max-w-md">
                <SearchBar />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" className="bg-background/40 backdrop-blur-md hover:bg-background/60">Sign Up</Button>
              <Button className="bg-primary/90 backdrop-blur-md hover:bg-primary/100">Log In</Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 pb-24">
            <h1 className="text-2xl font-bold mb-6">Browse All</h1>
            
            {searchQuery ? (
              // Search results
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="mb-4 glass-effect">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="albums">Albums</TabsTrigger>
                  <TabsTrigger value="artists">Artists</TabsTrigger>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <AlbumGrid title="Top Result" albums={searchResults.albums.slice(0, 1)} className="mb-8" />
                  <AlbumGrid title="Albums" albums={searchResults.albums} className="mb-8" />
                  <AlbumGrid title="Artists" albums={searchResults.artists} className="mb-8" />
                  <AlbumGrid title="Playlists" albums={searchResults.playlists} className="mb-8" />
                </TabsContent>
                <TabsContent value="albums">
                  <AlbumGrid title="Albums" albums={searchResults.albums} className="mb-8" />
                </TabsContent>
                <TabsContent value="artists">
                  <AlbumGrid title="Artists" albums={searchResults.artists} className="mb-8" />
                </TabsContent>
                <TabsContent value="playlists">
                  <AlbumGrid title="Playlists" albums={searchResults.playlists} className="mb-8" />
                </TabsContent>
              </Tabs>
            ) : (
              // Browse categories
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`relative h-44 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-transform hover:shadow-lg`}
                  >
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${category.color} opacity-60`}></div>
                    <div className="absolute inset-0 p-4 flex items-end">
                      <h3 className="text-white font-bold text-2xl drop-shadow-md">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Player />
      </div>
    </div>
  );
}

export default SearchPage;
