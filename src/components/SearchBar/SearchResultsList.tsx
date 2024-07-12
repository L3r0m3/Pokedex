import SearchResultListStyle from "./SearchResultList.module.scss";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ filteredPokemons }) => {
  return (
    <div className={SearchResultListStyle.SearchResultList}>
      {filteredPokemons.map((data, i) => {
        return <SearchResult filteredPokemons={data.name} key={i} />;
      })}
    </div>
  );
};
