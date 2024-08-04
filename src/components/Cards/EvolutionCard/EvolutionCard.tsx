import Image from "next/image";
import { EvolutionChain } from "@/types/types";
import PokePageStyle from "../../../app/[name]/PokePage.module.scss";
import { LoadPokemon, typeColors } from "@/lib/data";
import { RiArrowRightWideLine } from "react-icons/ri";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EvolutionCard = ({ pokeData }) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const router = useRouter();
  const { name } = useParams();

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
  }, [name]);

  if (!evolutionChain) {
    return <div>Loading...</div>;
  }

  const mainType = pokeData.types;

  const evolutionChainComponents = [];
  let currentChain = evolutionChain.chain;

  while (currentChain) {
    const speciesName = currentChain.species.name;
    const speciesID = parseInt(currentChain.species.url.match(/\/(\d+)\//)[1]);

    evolutionChainComponents.push(
      <div className={PokePageStyle.EvolutionImageContainer} key={speciesName}>
        <Image
          onClick={() => router.push(`/${speciesName}`)}
          priority={true}
          className={PokePageStyle.EvolutionImage}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesID}.png`}
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
          <h4 style={{ backgroundColor: typeColors[mainType] }}>{mainType}</h4>
        </div>
      </div>
    );

    if (currentChain.evolves_to.length > 0) {
      currentChain = currentChain.evolves_to[0];
    } else {
      currentChain = null;
    }
  }

  return <>{evolutionChainComponents}</>;
};

export default EvolutionCard;
