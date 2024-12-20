import { typeColors } from "@/lib/data";

export interface Pokemon {
  name: string;
  genus: {
    genus: string | string[];
  };
  id: number;
  types: string[];
  number: string;
  height: number;
  species: string;
  flavor_text: string;
  weight: number;
  abilities: string | undefined;
  images: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
}

export interface Pokemons {
  name: string;
  id: number;
  types: string[];
  number: string;
  height: number;
  abilities: string | string[];
  images: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
}

export interface EvolutionChain {
  chain: {
    evolves_to: {
      species: {
        name: string | string[];
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    }[];
    species: {
      name: string;
      url: string;
    };
  };
}

export interface IAllSummeries {
  allSummeries: {
    name: string[];
    url?: string | string[];
  };
  count?: number;
}

export interface PaginatedPokemonResponse {
  all: Pokemons[];
  types?: string | string[];
  nextOffset: number | null;
}

export type PokemonType = keyof typeof typeColors;
