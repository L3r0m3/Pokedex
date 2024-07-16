import React, { useEffect } from "react";
import { useSearch } from "@/context/SearchContext";

const FilterPokemon = () => {
  const { filteredPokemons, pokemons } = useSearch();

  useEffect(() => {
    const filterType = pokemons.filter((pokemon) => pokemon.types);
  }, []);

  return <div>FilterPokemon</div>;
};

export default FilterPokemon;
