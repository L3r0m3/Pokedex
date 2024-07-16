"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LoadPokemons, LoadAllPokemons } from "@/lib/data";
import { Pokemon } from "@/types/types";

interface SearchContextProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  filteredPokemons: Pokemon[];
  currentPage: number;
  handlePagination: (pageNumber: number) => void;
  count: number;
  pokemonsPerPage: number;
  pokemons: Pokemon[];
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
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allPokemonSummeries, setAllPokemonSummeries] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const pokemonsPerPage = 12;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //   console.log(LoadAllPokemons());

  useEffect(() => {
    const fetchSummeries = async () => {
      const { allSummeries, count } = await LoadAllPokemons();
      setAllPokemonSummeries(allSummeries);
      setCount(count);
    };

    fetchSummeries();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * pokemonsPerPage;
      const { all } = await LoadPokemons(pokemonsPerPage, offset);
      //   setCount(count);
      setPokemons(all);
      setFilteredPokemons(all);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const filtered = allPokemonSummeries.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [searchQuery, allPokemonSummeries]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleSearchChange,
        filteredPokemons,
        currentPage,
        handlePagination,
        count,
        pokemonsPerPage,
        pokemons,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
