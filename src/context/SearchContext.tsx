"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { LoadPokemons, LoadAllPokemons } from "@/lib/data";
import { Pokemon, PaginatedPokemonResponse } from "@/types/types";

interface SearchContextProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  filteredPokemons: Pokemon[];
  allPokemonData: any;
  filterType: string;
  setFilterType: (type: string) => void;
  setSearchQuery: any;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  paginatedPokemons: Pokemon[];
  isFetching: boolean;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const { data: allPokemonData, isSuccess: isSummariesLoaded } = useQuery({
    queryKey: ["allPokemons"],
    queryFn: LoadAllPokemons,
  });

  const {
    data: paginatedPokemonData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery<PaginatedPokemonResponse>({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 0 }) => LoadPokemons(12, pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? null,
    initialPageParam: 0,
  });

  const filteredPokemons = useMemo(() => {
    if (!paginatedPokemonData || !paginatedPokemonData.pages[0].all) return [];
    let filtered = paginatedPokemonData.pages.flatMap((page) => page.all);

    if (searchQuery) {
      filtered = filtered?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((pokemon) =>
        /* @ts-ignore */
        pokemon.types.some((type) =>
          type.toLowerCase().includes(filterType.toLowerCase())
        )
      );
    }

    return filtered;
  }, [searchQuery, filterType, paginatedPokemonData]);

  const paginatedPokemons = useMemo(() => {
    if (!paginatedPokemonData || !paginatedPokemonData.pages) return [];
    let allPokemons = paginatedPokemonData.pages.flatMap((page) => page.all);

    if (filterType) {
      allPokemons = allPokemons.filter((pokemon) =>
        /* @ts-ignore */
        pokemon.types.some((type) =>
          type.toLowerCase().includes(filterType.toLowerCase())
        )
      );
    }

    return allPokemons;
  }, [paginatedPokemonData, filterType]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleSearchChange,
        setSearchQuery,
        filterType,
        setFilterType,
        allPokemonData,
        filteredPokemons,
        fetchNextPage,
        hasNextPage,
        paginatedPokemons,
        isFetching,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
