"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoadPokemons } from "@/lib/data";
import { PaginatedPokemonResponse, Pokemons } from "@/types/types";

interface SearchContextProps {
  searchQuery: string | undefined;
  handleSearchChange: (query: string) => void;
  filteredPokemons: Pokemons[];
  filterType: string | string[];
  setFilterType: (type: string) => void;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  paginatedPokemons: Pokemons[];
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
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

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
      filtered = filtered?.filter((pokemon): boolean =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter((pokemon): boolean =>
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
      allPokemons = allPokemons.filter((pokemon): boolean =>
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
