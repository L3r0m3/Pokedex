"use client";

import PropTypes from "prop-types";
import Image from "next/image";
import PokeHomeCardStyle from "./PokeCard.module.scss";
import { useRouter } from "next/navigation";
import { Pokemon } from "@/types/types";
import { typeColors } from "@/lib/data";
interface PokeCardClientProps {
  pokeData: Pokemon[];
}

const PokeCardClient: React.FC<PokeCardClientProps> = ({ pokeData }) => {
  const router = useRouter();

  return (
    <div className={PokeHomeCardStyle.CardContainer}>
      {pokeData.map((data, id) => {
        const mainType =
          data.types && data.types.length > 0
            ? data.types[0].type.name
            : "normal";
        const bgColor = mainType ? typeColors[mainType] : "#FFFFFF";

        return (
          <div key={id}>
            <div className={PokeHomeCardStyle.Image}>
              <Image
                priority={true}
                src={data.images?.front_default}
                alt="poke-image"
                height={250}
                width={250}
                onClick={() => router.push(`/${data.name}`)}
              />
            </div>
            <h5>{`# ${data.number}`}</h5>
            <h4>{data.name}</h4>
            <h6 style={{ backgroundColor: bgColor }}>{mainType}</h6>
          </div>
        );
      })}
    </div>
  );
};

PokeCardClient.propTypes = {
  pokeData: PropTypes.array.isRequired,
};

export default PokeCardClient;
