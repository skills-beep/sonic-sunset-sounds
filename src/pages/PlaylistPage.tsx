
import { useParams } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import { PlaylistDetail } from "@/components/playlist-detail";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

// Mock playlist data (in a real app, this would be fetched based on the ID)
const playlists = {
  "chill-vibes": {
    title: "Chill Vibes",
    description: "The perfect playlist for relaxing and unwinding. Soft melodies and gentle rhythms to help you de-stress and find your zen.",
    coverUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    createdBy: "Spotify",
    totalTracks: 15,
    duration: "1 hr 12 min",
    tracks: [
      { id: "t1", title: "Sunset Dreams", artist: "Luna Echo", duration: "3:45", albumTitle: "Midnight Tales" },
      { id: "t2", title: "Ocean Waves", artist: "Coastal Sounds", duration: "4:12", albumTitle: "Seaside Sessions" },
      { id: "t3", title: "Mountain Air", artist: "Alpine Orchestra", duration: "3:56", albumTitle: "Heights" },
      { id: "t4", title: "Rainy Day", artist: "Storm Chasers", duration: "5:02", albumTitle: "Weather Patterns" },
      { id: "t5", title: "Gentle Breeze", artist: "Wind Whispers", duration: "4:21", albumTitle: "Natural Elements" },
      { id: "t6", title: "Fireplace Crackle", artist: "Warm Ember", duration: "3:33", albumTitle: "Cozy Nights" },
      { id: "t7", title: "Starry Night", artist: "Cosmic Dreams", duration: "4:45", albumTitle: "Universe" },
      { id: "t8", title: "Morning Dew", artist: "Dawn Chorus", duration: "3:22", albumTitle: "New Day" },
      { id: "t9", title: "Forest Sounds", artist: "Nature's Voice", duration: "5:17", albumTitle: "Wild Places" },
      { id: "t10", title: "Soft Piano", artist: "Ivory Touch", duration: "4:08", albumTitle: "Classical Moods" },
      { id: "t11", title: "Meditation", artist: "Inner Peace", duration: "6:30", albumTitle: "Tranquility" },
      { id: "t12", title: "Lazy Sunday", artist: "Weekend Vibes", duration: "3:47", albumTitle: "Days Off" },
      { id: "t13", title: "Café Ambience", artist: "Urban Sounds", duration: "4:52", albumTitle: "City Life" },
      { id: "t14", title: "Floating", artist: "Gravity Zero", duration: "3:39", albumTitle: "Weightless" },
      { id: "t15", title: "Deep Sleep", artist: "Dream Weavers", duration: "5:25", albumTitle: "Restful Nights" },
    ],
  },
  "top-hits-2024": {
    title: "Top Hits 2024",
    description: "The biggest hits of 2024. Updated weekly with the latest chart-toppers.",
    coverUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    createdBy: "Spotify",
    totalTracks: 10,
    duration: "35 min",
    tracks: [
      { id: "t16", title: "Electric Dreams", artist: "Neon Wave", duration: "3:12", albumTitle: "Future Sounds" },
      { id: "t17", title: "Dancing Stars", artist: "Galaxy Girls", duration: "2:58", albumTitle: "Space Odyssey" },
      { id: "t18", title: "Heart Beat", artist: "Pulse", duration: "3:45", albumTitle: "Rhythm" },
      { id: "t19", title: "Summer Nights", artist: "Beach Vibes", duration: "4:02", albumTitle: "Seasonal Moods" },
      { id: "t20", title: "City Lights", artist: "Urban Echo", duration: "3:33", albumTitle: "Metropolis" },
      { id: "t21", title: "Fast Lane", artist: "Speed Demons", duration: "2:47", albumTitle: "Acceleration" },
      { id: "t22", title: "Love Story", artist: "Heartfelt", duration: "4:22", albumTitle: "Emotions" },
      { id: "t23", title: "Digital Age", artist: "Tech Beats", duration: "3:18", albumTitle: "Innovation" },
      { id: "t24", title: "Freedom Call", artist: "Liberty Band", duration: "3:55", albumTitle: "Revolution" },
      { id: "t25", title: "Last Dance", artist: "Midnight Move", duration: "3:34", albumTitle: "Final Set" },
    ],
  },
  "rock-classics": {
    title: "Rock Classics",
    description: "Timeless rock anthems from the 60s to the 2000s.",
    coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    createdBy: "Spotify",
    totalTracks: 8,
    duration: "42 min",
    tracks: [
      { id: "t26", title: "Guitar Hero", artist: "Fret Masters", duration: "5:12", albumTitle: "Six String Stories" },
      { id: "t27", title: "Drum Solo", artist: "Beat Makers", duration: "4:48", albumTitle: "Percussion Power" },
      { id: "t28", title: "Bass Line", artist: "Low End Theory", duration: "4:32", albumTitle: "Foundation" },
      { id: "t29", title: "Power Chord", artist: "Amplified", duration: "5:15", albumTitle: "Turn it Up" },
      { id: "t30", title: "Stadium Rock", artist: "Crowd Pleasers", duration: "6:02", albumTitle: "Live Forever" },
      { id: "t31", title: "Classic Solo", artist: "Virtuoso", duration: "7:23", albumTitle: "Mastery" },
      { id: "t32", title: "Heavy Riffs", artist: "Metal Masters", duration: "4:45", albumTitle: "Iron Sound" },
      { id: "t33", title: "Acoustic Break", artist: "Unplugged", duration: "4:17", albumTitle: "Natural Tone" },
    ],
  },
  // Add more playlists as needed
};

const PlaylistPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { theme } = useTheme();
  
  // In a real app, you would fetch the playlist based on the playlistId
  const playlist = playlistId ? playlists[playlistId as keyof typeof playlists] : null;
  
  if (!playlist) {
    return <div>Playlist not found</div>;
  }

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
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline">Sign Up</Button>
              <Button>Log In</Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-6xl">
              <PlaylistDetail
                title={playlist.title}
                description={playlist.description}
                coverUrl={playlist.coverUrl}
                createdBy={playlist.createdBy}
                totalTracks={playlist.totalTracks}
                duration={playlist.duration}
                tracks={playlist.tracks}
              />
            </div>
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

export default PlaylistPage;
