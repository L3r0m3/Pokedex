"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../public/pokedex_logo.png";
import HeaderStyle from "./Header.module.scss";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

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
    </div>
  );
};

export default Header;
