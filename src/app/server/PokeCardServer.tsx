"use client";

import React, { useEffect, useState } from "react";
import { LoadPokemons } from "@/lib/data";
import SearchBar from "@/components/SearchBar/SearchBar";
import PokeCardClient from "../../components/Cards/PokeCardClient";
import { Pokemon } from "@/types/types";
import { SearchResultsList } from "@/components/SearchBar/SearchResultsList";
import SearchBarStyle from "../../components/SearchBar/SearchBar.module.scss";
import PokeCardStyle from "./PokeCardServer.module.scss";
import Pagination from "@/components/Pagination/Pagination";

const PokeCardServer = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pokemonsPerPage = 24;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // setCurrentPage(1);
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * pokemonsPerPage;
      const { all, count } = await LoadPokemons(pokemonsPerPage, offset);
      setTotalCount(count);
      setPokemons(all);
      setFilteredPokemons(all);
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [searchQuery, pokemons]);

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

// "use client";

// import React, { useEffect, useState } from "react";
// import { LoadPokemons } from "@/lib/data";
// import SearchBar from "@/components/SearchBar/SearchBar";
// import PokeCardClient from "../../components/Cards/PokeCardClient";
// import { Pokemon } from "@/types/types";
// import { SearchResultsList } from "@/components/SearchBar/SearchResultsList";
// import SearchBarStyle from "../../components/SearchBar/SearchBar.module.scss";
// import PokeCardStyle from "./PokeCardServer.module.scss";
// import Pagination from "@/components/Pagination/Pagination";

// const PokeCardServer = () => {
//   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
//   const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const pokemonsPerPage = 12;

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const handlePagination = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const offset = (currentPage - 1) * pokemonsPerPage;
//       const { all, count } = await LoadPokemons(pokemonsPerPage, offset);
//       setTotalCount(count);
//       setPokemons(all);
//     };

//     fetchData();
//   }, [currentPage]);

//   useEffect(() => {
//     const filtered = pokemons.filter((pokemon) =>
//       pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredPokemons(filtered);
//   }, [searchQuery, pokemons]);

//   return (
//     <>
//       <div className={SearchBarStyle.SearchBarWrapper}>
//         <SearchBar
//           searchQuery={searchQuery}
//           onSearchChange={handleSearchChange}
//         />
//         {searchQuery ? (
//           <SearchResultsList filteredPokemons={filteredPokemons} />
//         ) : null}
//       </div>
//       <div className={PokeCardStyle.CardClientContainer}>
//         <PokeCardClient pokeData={filteredPokemons} />
//         <Pagination
//           pokemonsPerPage={pokemonsPerPage}
//           totalPokemons={totalCount}
//           handlePagination={handlePagination}
//           currentPage={currentPage}
//         />
//       </div>
//     </>
//   );
// };

// export default PokeCardServer;

// "use client";

// import React, { useEffect, useState } from "react";
// import { LoadPokemons } from "@/lib/data";
// import SearchBar from "@/components/SearchBar/SearchBar";
// import PokeCardClient from "../../components/Cards/PokeCardClient";
// import { Pokemon } from "@/types/types";
// import { SearchResultsList } from "@/components/SearchBar/SearchResultsList";
// import SearchBarStyle from "../../components/SearchBar/SearchBar.module.scss";
// import PokeCardStyle from "./PokeCardServer.module.scss";
// import Pagination from "@/components/Pagination/Pagination";

// const PokeCardServer = () => {
//   const [pokemons, setPokemons] = useState([]);
//   const [filteredPokemons, setFilteredPokemons] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   let [limit, setLimit] = useState(12);
//   const [count, setCount] = useState(12);
//   const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
//   let offset = 0;

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const handlePagination = (pagenNumber) => {
//     setCurrentPage(pagenNumber);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const { all, count } = await LoadPokemons(limit, offset);
//       setCount(count);
//       setPokemons(all);
//       setFilteredPokemons(all);
//     };

//     fetchData();
//   }, [limit, offset]);

//   useEffect(() => {
//     const filterd = pokemons.filter((pokemon) =>
//       pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredPokemons(filterd);
//   }, [searchQuery, pokemons]);

//   return (
//     <>
//       <div className={SearchBarStyle.SearchBarWrapper}>
//         <SearchBar
//           searchQuery={searchQuery}
//           onSearchChange={handleSearchChange}
//         />
//         {searchQuery ? (
//           <SearchResultsList filteredPokemons={filteredPokemons} />
//         ) : null}
//       </div>
//       <div className={PokeCardStyle.CardClientContainer}>
//         <Pagination
//           pokemonsPerPage={pokemonsPerPage}
//           count={count}
//           handlePagination={handlePagination}
//           currentPage={filteredPokemons}
//           filteredPokemons={filteredPokemons}
//         />
//       </div>
//     </>
//   );
// };

// export default PokeCardServer;
