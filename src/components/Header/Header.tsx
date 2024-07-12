import React from "react";
import Image from "next/image";
import Logo from "../../../public/PokedeX.png";
import HeaderStyle from "./Header.module.scss";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  return (
    <div className={HeaderStyle.HeaderContainer}>
      <div>
        <Image src={Logo} alt="logo" height={100} width={100} />
      </div>
      <div>
        <Image src={Logo} alt="logo" height={100} width={100} />
      </div>
    </div>
  );
};

export default Header;
