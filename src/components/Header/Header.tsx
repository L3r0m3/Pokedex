"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../public/pokedex_logo.png";
import HeaderStyle from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";
import SearchBarStyle from "../SearchBar/SearchBar.module.scss";
import SearchBar from "../SearchBar/SearchBar";
import FilterType from "../FilterType/FilterType";

const Header = () => {
  const router = useRouter();
  const { searchQuery, handleSearchChange } = useSearch();

  return (
    <div className={HeaderStyle.HeaderContainer}>
      <div>
        <Image
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
        <div>
          <h6>Filter type:</h6>
          <FilterType />
        </div>
      </div>
    </div>
  );
};

export default Header;
