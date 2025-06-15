import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  onSearch: (searchInput) => void;
}

const SearchBar: React.FC<Props> = ({onSearch}) => {
    const [searchInput, setSearchInput] = useState("");
  return (
    <div className="flex gap-2 items-center">
        <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-right"
            type="text"
            placeholder="البحث عن المشتركين..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
        />
        </div>
        <Button
        variant="default"
        onClick={() => {
            onSearch(searchInput);
        }}
        >
        أبحث
        </Button>
    </div>
  )
}

export default SearchBar