import SearchResultStyle from "./SearchResult.module.scss";
import { useRouter } from "next/navigation";

export const SearchResult = ({ pokemon }) => {
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`/${pokemon.name}`)}
        className={SearchResultStyle.Result}
      >
        {pokemon.name}
      </div>
    </>
  );
};
