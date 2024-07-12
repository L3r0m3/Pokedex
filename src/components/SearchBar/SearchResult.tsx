import SearchResultStyle from "./SearchResult.module.scss";
import { useRouter } from "next/navigation";

export const SearchResult = ({ filteredPokemons }) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/${filteredPokemons}`)}
        className={SearchResultStyle.Result}
      >
        {filteredPokemons}
      </div>
    </>
  );
};
