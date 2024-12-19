"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import PokeHomeCardStyle from "./PokeCard.module.scss";
import { useRouter } from "next/navigation";
import { typeColors } from "@/lib/data";
import { useSearch } from "@/context/SearchContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PokeCardClient = () => {
  const router = useRouter();
  const {
    filterType,
    filteredPokemons,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    paginatedPokemons,
  } = useSearch();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonElementRef = useCallback(
    /* @ts-ignore */
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  if (isLoading)
    return (
      <div>
        <Skeleton count={3} />
      </div>
    );

  return (
    <div>
      <>
        {paginatedPokemons && !filterType && (
          <div className={PokeHomeCardStyle.CardContainer}>
            {paginatedPokemons.map((pokemon, index) => {
              const mainTypes = pokemon.types;
              const bgColor =
                mainTypes.length > 0 ? typeColors[mainTypes[0]] : "#FFFFFF";

              return (
                <div
                  key={pokemon.name}
                  ref={
                    index !== filteredPokemons.length - 1
                      ? lastPokemonElementRef
                      : null
                  }
                >
                  <div
                    className={PokeHomeCardStyle.Image}
                    style={{ backgroundColor: bgColor }}
                  >
                    <Image
                      priority
                      src={pokemon.images?.front_default}
                      alt="poke-image"
                      height={200}
                      width={200}
                      onClick={() => router.push(`/${pokemon.name}`)}
                    />
                  </div>
                  <h5>{`# ${pokemon.number}`}</h5>
                  <h4>{pokemon.name}</h4>
                  <div key={pokemon.id}>
                    {mainTypes.map((type: any) => (
                      <span
                        key={type.id}
                        style={{ backgroundColor: bgColor }}
                        className={PokeHomeCardStyle.Type}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {isFetching && (
          <div className={PokeHomeCardStyle.CardContainer}>
            <Skeleton count={4} wrapper={Box} />
          </div>
        )}
      </>
      <div>
        <>
          {filterType && filteredPokemons && (
            <div className={PokeHomeCardStyle.CardContainer}>
              {paginatedPokemons.map((pokemons, i) => {
                const mainType =
                  pokemons.types && pokemons.types.length
                    ? pokemons.types
                    : "normal";

                const bgColor = mainType ? typeColors[mainType] : "#FFFFFF";

                return (
                  <div key={pokemons.id}>
                    <div className={PokeHomeCardStyle.Image}>
                      <Image
                        priority={true}
                        src={pokemons.images?.front_default}
                        alt="poke-image"
                        height={200}
                        width={200}
                        onClick={() => router.push(`/${pokemons.name}`)}
                      />
                    </div>
                    <h5>{`# ${pokemons.number}`}</h5>
                    <h4>{pokemons.name}</h4>
                    <h6 style={{ backgroundColor: bgColor }}>{mainType}</h6>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

const Box = ({ children }: any) => {
  return (
    <div
      style={{
        display: "inline-flex",
        lineHeight: 2,
        padding: "2rem",
        marginBottom: "0.5rem",
        width: 250,
        height: 250,
        minWidth: 100,
      }}
    >
      {children}
    </div>
  );
};

export default PokeCardClient;
