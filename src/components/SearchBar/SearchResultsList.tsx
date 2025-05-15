"use client";

import SearchResultListStyle from "./SearchResultList.module.scss";
import { SearchResult } from "./SearchResult";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";
import { LoadAllPokemons } from "@/lib/data";

export const SearchResultsList = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [allPokeNames, setAllPokeNames] = useState<string[]>([]);
  const [filteredPokeNames, setFilteredPokeNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      const { allSummeriesNames } = await LoadAllPokemons();
      setAllPokeNames(allSummeriesNames);
    };

    if (searchQuery) fetchAllPokemonNames();
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allPokeNames.filter((pokemon) => {
        return pokemon.toLowerCase().indexOf(searchQuery.toLowerCase()) === 0;
      });
      setFilteredPokeNames(filtered);
    } else {
      setFilteredPokeNames([]);
    }
  }, [searchQuery, allPokeNames]);

  return (
    <div className={SearchResultListStyle.SearchResultList}>
      {filteredPokeNames?.map((pokemon, i) => (
        <SearchResult
          key={i}
          pokemon={pokemon}
          setFilteredPokeNames={setFilteredPokeNames}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  );
};
