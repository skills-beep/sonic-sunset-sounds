
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import { SearchBar } from "@/components/search-bar";
import { AlbumGrid } from "@/components/album-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for categories
const categories = [
  { id: "podcasts", name: "Podcasts", color: "bg-orange-500" },
  { id: "live-events", name: "Live Events", color: "bg-pink-500" },
  { id: "made-for-you", name: "Made For You", color: "bg-blue-500" },
  { id: "new-releases", name: "New Releases", color: "bg-green-500" },
  { id: "pop", name: "Pop", color: "bg-purple-500" },
  { id: "hip-hop", name: "Hip-Hop", color: "bg-yellow-500" },
  { id: "rock", name: "Rock", color: "bg-red-500" },
  { id: "indie", name: "Indie", color: "bg-indigo-500" },
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
            <h1 className="text-2xl font-bold mb-6">Browse All</h1>
            
            {searchQuery ? (
              // Search results
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="mb-4">
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
                    className={`${category.color} rounded-lg aspect-square relative overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-transform`}
                  >
                    <div className="absolute inset-0 p-4">
                      <h3 className="text-white font-bold text-2xl">{category.name}</h3>
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
};

export default SearchPage;
