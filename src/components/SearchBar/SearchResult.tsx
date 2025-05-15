import { Dispatch, FC, SetStateAction } from "react";
import SearchResultStyle from "./SearchResult.module.scss";
import { useRouter } from "next/navigation";
import { Pokemon } from "@/types/types";

type TPokemonPath = {
  pokemon: Pokemon["name"];
  setFilteredPokeNames: Dispatch<SetStateAction<string[]>>;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
};

export const SearchResult: FC<TPokemonPath> = ({
  pokemon,
  setFilteredPokeNames,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/${pokemon}`);
    setFilteredPokeNames([]);
    setSearchQuery("");
  };

  return (
    <>
      <div onClick={handleOnClick} className={SearchResultStyle.Result}>
        {pokemon}
      </div>
    </>
  );
};
