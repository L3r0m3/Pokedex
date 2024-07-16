"use client";

import React from "react";
// import PokeCardClient from "./PokeCardClient";
import PokeCardStyle from "./PokeCardServer.module.scss";
// import Pagination from "@/components/Pagination/Pagination";
// import { useSearch } from "@/context/SearchContext";

const PokeCardServer = () => {
  // const {
  //   pokemons,
  //   filteredPokemons,
  //   handlePagination,
  //   pokemonsPerPage,
  //   currentPage,
  //   count,
  // } = useSearch();

  return (
    <>
      <div className={PokeCardStyle.CardClientContainer}>
        {/* <PokeCardClient pokeData={filteredPokemons && pokemons} />
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          totalPokemons={count}
          handlePagination={handlePagination}
          currentPage={currentPage}
        /> */}
      </div>
    </>
  );
};

export default PokeCardServer;
