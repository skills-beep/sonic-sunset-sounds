
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Library, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar transition-all duration-300 rounded-lg border border-border",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="p-4 flex justify-between items-center">
        <div className={cn("flex items-center", collapsed && "hidden")}>
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
          <span className="ml-2 font-bold text-lg">Spotify</span>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="px-3 py-2">
        <nav className="space-y-2">
          <NavItem to="/" icon={<Home size={24} />} label="Home" collapsed={collapsed} />
          <NavItem to="/search" icon={<Search size={24} />} label="Search" collapsed={collapsed} />
          <NavItem to="/library" icon={<Library size={24} />} label="Library" collapsed={collapsed} />
        </nav>
      </div>

      <div className="mt-4 p-3">
        <div className={cn("text-xs uppercase font-semibold mb-2 text-muted-foreground", collapsed && "hidden")}>
          Playlists
        </div>
        <div className={cn("space-y-1 text-sm", collapsed && "hidden")}>
          <PlaylistItem name="Chill Vibes" />
          <PlaylistItem name="Top Hits 2024" />
          <PlaylistItem name="Rock Classics" />
          <PlaylistItem name="Focus Flow" />
          <PlaylistItem name="Acoustic Favorites" />
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function NavItem({ to, icon, label, collapsed }: NavItemProps) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
    >
      <span>{icon}</span>
      <span className={cn(collapsed && "hidden")}>{label}</span>
    </Link>
  );
}

function PlaylistItem({ name }: { name: string }) {
  return (
    <Link to={`/playlist/${name.toLowerCase().replace(/\s+/g, "-")}`} className="block px-3 py-1.5 hover:text-primary transition-colors">
      {name}
    </Link>
  );
}
