"use client";

import { useState, useEffect } from "react";
import { LoadPokemon, typeColors } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";
import { Pokemon } from "@/types/types";
import Image from "next/image";
import PokePageStyle from "./PokePage.module.scss";
import EvolutionCard from "@/components/Cards/EvolutionCard/EvolutionCard";

const PokePage = () => {
  const { name } = useParams();
  const router = useRouter();
  const [pokeData, setPokeData] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const { pokemon } = await LoadPokemon(name);
      setPokeData(pokemon);
    };

    if (name) {
      fetchPokemon();
    }
  }, [name]);

  if (!pokeData) {
    return <div>Loading...</div>;
  }

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
            <EvolutionCard pokeData={pokeData} />
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
