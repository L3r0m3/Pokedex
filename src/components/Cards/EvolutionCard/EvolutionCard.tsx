import Image from "next/image";
import PokePageStyle from "../../../app/[name]/PokePage.module.scss";
import { LoadPokemon } from "@/lib/data";
import { RiArrowRightWideLine } from "react-icons/ri";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EvolutionChain } from "@/types/types";

// interface EvolutionChain {
//   species: {
//     name: string | string[];
//     url: string;
//   };
//   evolves_to: EvolutionChain[];
//   chain: EvolutionChain;
// }

const EvolutionCard = () => {
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

  // const mainType = pokeData.types;

  const evolutionChainComponents: JSX.Element[] = [];

  let currentChain: EvolutionChain | null = evolutionChain;

  function extractSpeciesID(url: string): number | null {
    const match = url.match(/\/(\d+)\//);
    return match ? parseInt(match[1]) : null;
  }

  while (currentChain) {
    const speciesName = currentChain.chain.species.name;
    const speciesID = extractSpeciesID(currentChain.chain.species.url);

    if (speciesID !== null) {
      evolutionChainComponents.push(
        <div
          className={PokePageStyle.EvolutionImageContainer}
          key={speciesName}
        >
          <Image
            onClick={() => router.push(`/${speciesName}`)}
            priority={true}
            className={PokePageStyle.EvolutionImage}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesID}.png`}
            alt={speciesName}
            width={150}
            height={150}
          />
          {currentChain.chain.evolves_to.length > 0 && (
            <RiArrowRightWideLine size={60} color="white" />
          )}
          <div>
            <p>{speciesName}</p>
            <p>{`# ${speciesID.toString().padStart(4, "0")}`}</p>
          </div>
        </div>
      );
    }

    if (currentChain.chain.evolves_to.length > 0) {
      currentChain = currentChain;
    } else {
      currentChain = null;
    }
  }

  return <>{evolutionChainComponents}</>;
};

export default EvolutionCard;
