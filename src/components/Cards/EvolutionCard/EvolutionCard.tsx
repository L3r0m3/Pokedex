import React, { useEffect, useState } from "react";
import { LoadPokemon } from "@/lib/data";
import { useParams } from "next/navigation";
import { EvolutionChain, Pokemon } from "@/types/types";

const EvolutionCard = ({ pokeData }) => {
  const { name } = useParams();
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { evolutionChain } = await LoadPokemon(name);
        setEvolutionChain(evolutionChain);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    if (name) {
      fetchPokemon();
    }
  }, [name, evolutionChain]);

  if (!pokeData || !evolutionChain) {
    return <div>Loading...</div>;
  }

  const renderEvolutionChain = (chain) => {
    if (!chain) return null;

    return (
      <div>
        <p>{chain.species.name}</p>
        {chain.evolves_to.length > 0 &&
          chain.evolves_to.map((evolution) => (
            <div key={evolution.species.name}>
              {renderEvolutionChain(evolution)}
            </div>
          ))}
      </div>
    );
  };
};

export default EvolutionCard;
