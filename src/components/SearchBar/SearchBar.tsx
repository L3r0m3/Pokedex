import React from "react";
import SearchBarStyle from "./SearchBar.module.scss";
import { SearchResultsList } from "./SearchResultsList";

interface SearchBarProps {
  searchQuery: string | undefined;
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
      <div>
        <input
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={handleInputChange}
          type="text"
        />
        <div>{searchQuery && <SearchResultsList />}</div>
      </div>
    </div>
  );
};

export default SearchBar;
