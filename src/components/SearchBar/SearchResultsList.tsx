"use client";

import SearchResultListStyle from "./SearchResultList.module.scss";
import { SearchResult } from "./SearchResult";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState, FC } from "react";
import { IAllSummeries } from "@/types/types";

interface SearchResultListProps {
  allPokemonData: IAllSummeries["allSummeries"];
}

export const SearchResultsList: FC<SearchResultListProps> = ({
  allPokemonData,
}) => {
  const { searchQuery } = useSearch();
  const [filteredPokemons, setFilteredPokemons] = useState<string[]>([]);

  useEffect(() => {
    try {
      if (searchQuery) {
        const filtered = allPokemonData.name.filter((pokemon) => {
          pokemon.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredPokemons(filtered);
      } else {
        setFilteredPokemons(allPokemonData?.name);
      }
    } catch {
      if (Error) {
        console.log(Error);
      }
    }
  }, [allPokemonData, searchQuery]);

  return (
    <div className={SearchResultListStyle.SearchResultList}>
      {filteredPokemons.map((pokemon, i) => (
        <SearchResult key={i} pokemon={pokemon} />
      ))}
    </div>
  );
};
