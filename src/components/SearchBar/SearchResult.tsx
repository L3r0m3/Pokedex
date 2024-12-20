import { FC } from "react";
import SearchResultStyle from "./SearchResult.module.scss";
import { useRouter } from "next/navigation";
import { Pokemon } from "@/types/types";

type TPokemonPath = {
  pokemon: Pokemon["name"];
};

export const SearchResult: FC<TPokemonPath> = ({ pokemon }) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/${pokemon}`)}
        className={SearchResultStyle.Result}
      >
        {pokemon}
      </div>
    </>
  );
};
