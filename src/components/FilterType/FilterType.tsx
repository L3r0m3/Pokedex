import React from "react";
import { useSearch } from "@/context/SearchContext";
// import { useRouter } from "next/navigation";
import FilterTypeStyle from "./FilterTypeStyle.module.scss";

function FilterType() {
  const { filteredPokemons, filterType, setFilterType } = useSearch();

  const uniqueTypes = Array.from(
    new Set(filteredPokemons.flatMap((pokemon) => pokemon.types))
  );

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterType(event.target.value);
  };

  return (
    <>
      <div>
        <select
          className={FilterTypeStyle.FilterType}
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FilterType;
