"use client";

import React, { useEffect, useState } from "react";
import { LoadPokemons, LoadAllPokemons } from "@/lib/data";
import SearchBar from "@/components/SearchBar/SearchBar";
import PokeCardClient from "../../components/Cards/PokeCardClient";
import { Pokemon } from "@/types/types";
import { SearchResultsList } from "@/components/SearchBar/SearchResultsList";
import SearchBarStyle from "../../components/SearchBar/SearchBar.module.scss";
import PokeCardStyle from "./PokeCardServer.module.scss";
import Pagination from "@/components/Pagination/Pagination";

const PokeCardServer = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allPokemonSummeries, setAllPokemonSummeries] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pokemonsPerPage = 12;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchSummeries = async () => {
      const { allSummeries, count } = await LoadAllPokemons();
      setAllPokemonSummeries(allSummeries);
      setTotalCount(count);
    };
    fetchSummeries();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * pokemonsPerPage;
      const { all } = await LoadPokemons(pokemonsPerPage, offset);
      // setTotalCount(count);
      setPokemons(all);
      setFilteredPokemons(all);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (allPokemonSummeries.length > 0) {
      const filtered = allPokemonSummeries.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [searchQuery, allPokemonSummeries]);

  return (
    <>
      <div className={SearchBarStyle.SearchBarWrapper}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        {searchQuery ? (
          <SearchResultsList filteredPokemons={filteredPokemons} />
        ) : null}
      </div>
      <div className={PokeCardStyle.CardClientContainer}>
        <PokeCardClient pokeData={filteredPokemons} />
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          totalPokemons={totalCount}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default PokeCardServer;
