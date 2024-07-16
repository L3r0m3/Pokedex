"use client";

import { useState, useEffect } from "react";
import { LoadPokemon, typeColors } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";
import { Pokemon, EvolutionChain } from "@/types/types";
import Image from "next/image";
import PokePageStyle from "./PokePage.module.scss";
import { RiArrowRightWideLine } from "react-icons/ri";

const PokePage = () => {
  const { name } = useParams();
  const router = useRouter();
  const [pokeData, setPokeData] = useState<Pokemon | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { pokemon, evolutionChain } = await LoadPokemon(name);
        setPokeData(pokemon);
        setEvolutionChain(evolutionChain);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    if (name) {
      fetchPokemon();
    }
  }, [name]);

  if (!pokeData || !evolutionChain) {
    return <div>Loading...</div>;
  }

  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    const evolutionChainComponents = [];
    let currentChain = chain;

    // console.log("currentChain", currentChain);

    while (currentChain) {
      const speciesName = currentChain.species.name;
      const speciesID = parseInt(
        currentChain.species.url.match(/\/(\d+)\//)[1]
      );
      evolutionChainComponents.push(
        <div
          className={PokePageStyle.EvolutionImageContainer}
          key={speciesName}
        >
          <Image
            onClick={() => router.push(`/${speciesName}`)}
            priority={true}
            className={PokePageStyle.EvolutionImage}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              currentChain.species.url.split("/").slice(-2, -1)[0]
            }.png`}
            alt={speciesName}
            width={150}
            height={150}
          />
          {currentChain.evolves_to.length > 0 && (
            <RiArrowRightWideLine size={60} color="white" />
          )}
          <div>
            <p>{speciesName}</p>
            <p>{`# ${speciesID.toString().padStart(4, "0")}`}</p>
            <h4 style={{ backgroundColor: typeColors[mainType] }}>
              {mainType}
            </h4>
          </div>
        </div>
      );

      if (currentChain.evolves_to.length > 0) {
        currentChain = currentChain.evolves_to[0];
      } else {
        currentChain = null;
      }
    }
    return evolutionChainComponents;
  };

  const mainType = pokeData.types;

  return (
    <>
      <div className={PokePageStyle.Section}>
        <div className={PokePageStyle.Container}>
          <div className={PokePageStyle.DetailsSection}>
            <div className={PokePageStyle.PokeHeaderSection}>
              <div>
                <h1>{pokeData.name}</h1>
              </div>
              <div>
                <h1>{`Nr. ${pokeData.id}`}</h1>
              </div>
            </div>
            <div className={PokePageStyle.PokeImage}>
              <Image
                priority={true}
                src={pokeData.images.front_default}
                alt={pokeData.name}
                width={350}
                height={350}
              />
            </div>
          </div>
          <div className={PokePageStyle.RightsideContainer}>
            <div>
              <p>{pokeData.flavor_text}</p>
            </div>
            <div className={PokePageStyle.PokeDetailsSection}>
              <div>
                <p>height</p>
                <h4>{`${(pokeData.height / 10)
                  .toFixed(1)
                  .replace(".", ",")} m`}</h4>
              </div>
              <div>
                <p>weight</p>
                <h4>{`${(pokeData.weight / 10)
                  .toFixed(1)
                  .replace(".", ",")} kg`}</h4>
              </div>
              <div>
                <p>species</p>
                <h4>{pokeData.species[7].genus}</h4>
              </div>
              <div>
                <p>ability</p>
                <h4>{pokeData.abilities[0].ability.name}</h4>
              </div>
            </div>
            <div className={PokePageStyle.TypeSection}>
              <h3>Type</h3>
              <h4 style={{ backgroundColor: typeColors[mainType] }}>
                {mainType}
              </h4>
            </div>
          </div>
        </div>
        <div>
          <div className={PokePageStyle.EvolutionSection}>
            {evolutionChain && renderEvolutionChain(evolutionChain.chain)}
          </div>
        </div>
        <button onClick={() => router.push("/")}>
          <h3>Explore more Pokémons</h3>
        </button>
      </div>
    </>
  );
};

export default PokePage;
