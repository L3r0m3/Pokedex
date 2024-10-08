"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../public/pokedex_logo.png";
import HeaderStyle from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";
import SearchBarStyle from "../SearchBar/SearchBar.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import { SearchResultsList } from "../SearchBar/SearchResultsList";
import FilterType from "../FilterType/FilterType";

const Header = () => {
  const router = useRouter();
  const { searchQuery, handleSearchChange, allPokemonData } = useSearch();

  return (
    <div className={HeaderStyle.HeaderContainer}>
      <div>
        <Image
          /** @ts-ignore */
          as="image"
          priority
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
          src={Logo}
          alt="logo"
          height={50}
          width={150}
        />
      </div>
      <div className={SearchBarStyle.SearchBarWrapper}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        {searchQuery && <SearchResultsList allPokemonData={allPokemonData} />}
        <div>
          <h6>Filter by type:</h6>
          <FilterType />
        </div>
      </div>
    </div>
  );
};

export default Header;
