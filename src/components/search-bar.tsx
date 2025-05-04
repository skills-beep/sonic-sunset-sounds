
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Implement search functionality
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative flex items-center ${className}`}
    >
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search for songs, artists or albums"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 bg-secondary border border-transparent focus:border-primary"
      />
    </form>
  );
}
