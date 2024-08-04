import Image from "next/image";
import PokePageStyle from "../../../app/[name]/PokePage.module.scss";
import { LoadPokemon, typeColors } from "@/lib/data";
import { RiArrowRightWideLine } from "react-icons/ri";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface EvolutionChain {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
}

const EvolutionCard = ({ pokeData }: any) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const router = useRouter();
  const { name } = useParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { evolutionChain } = await LoadPokemon(name);
        /* @ts-ignore */
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

  const evolutionChainComponents: JSX.Element[] = [];
  /* @ts-ignore */
  let currentChain: EvolutionChain | null = evolutionChain.chain;

  function extractSpeciesID(url: string): number | null {
    const match = url.match(/\/(\d+)\//);
    return match ? parseInt(match[1]) : null;
  }

  while (currentChain) {
    const speciesName = currentChain.species.name;
    const speciesID = extractSpeciesID(currentChain.species.url);

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
          {currentChain.evolves_to.length > 0 && (
            <RiArrowRightWideLine size={60} color="white" />
          )}
          <div>
            <p>{speciesName}</p>
            <p>{`# ${speciesID.toString().padStart(4, "0")}`}</p>
            {/* <h4 style={{ backgroundColor: typeColors[mainType] }}>
              {mainType}
            </h4> */}
          </div>
        </div>
      );
    }

    if (currentChain.evolves_to.length > 0) {
      currentChain = currentChain.evolves_to[0];
    } else {
      currentChain = null;
    }
  }

  return <>{evolutionChainComponents}</>;
};

export default EvolutionCard;
