"use client";

import SearchResultListStyle from "./SearchResultList.module.scss";
import { SearchResult } from "./SearchResult";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";

export const SearchResultsList = ({ allPokemonData }) => {
  const { searchQuery } = useSearch();
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    try {
      if (searchQuery) {
        const filtered = allPokemonData.allSummeries.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPokemons(filtered);
      } else {
        setFilteredPokemons(allPokemonData.allSummeries);
      }
    } catch {
      if (Error) {
        console.log(Error);
      }
    }
  }, [allPokemonData, searchQuery]);

  return (
    <div className={SearchResultListStyle.SearchResultList}>
      {filteredPokemons?.map((pokemon, i) => (
        <SearchResult key={i} pokemon={pokemon} />
      ))}
    </div>
  );
};

// "use client";

// import SearchResultListStyle from "./SearchResultList.module.scss";
// import { SearchResult } from "./SearchResult";
// import { useSearch } from "@/context/SearchContext";
// import { useEffect } from "react";

// export const SearchResultsList = ({ allPokemonData }) => {
//   const { searchQuery } = useSearch();

//   useEffect(() => {
//     if (searchQuery) {
//       let names = allPokemonData.allSummeries.filter((pokemon) =>
//         pokemon.name.some((pokemon) =>
//           pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );

//       return names;
//     }
//   }, [allPokemonData, searchQuery]);

//   return (
//     <div className={SearchResultListStyle.SearchResultList}>
//       {allPokemonData.allSummeries?.map((data, i) => {
//         return <SearchResult filteredPokemons={data.name} key={i} />;
//       })}
//     </div>
//   );
// };
