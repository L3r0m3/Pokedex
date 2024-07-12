import React from "react";
import SearchBarStyle from "./SearchBar.module.scss";
import { SearchResultsList } from "./SearchResultsList";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={SearchBarStyle.Wrapper}>
      <input
        placeholder="Search Pokemon"
        value={searchQuery}
        onChange={handleInputChange}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
