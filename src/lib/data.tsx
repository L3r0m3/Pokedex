import api from "../lib/api";
import {
  EvolutionChain,
  Pokemon,
  Pokemons,
  AllPokemonResponse,
  PaginatedPokemonResponse,
} from "../types/types";

export const LoadAllPokemons = async () => {
  const pokeList = await api.get(`/pokemon?limit=10000&offset=0`);
  const allSummeries = pokeList.data.results.map((pokemon) => ({
    name: pokemon.name,
    url: pokemon.url,
  }));

  return { allSummeries, count: pokeList.data.count };
};

export const LoadPokemons = async (
  limit: number,
  offset: number
): Promise<PaginatedPokemonResponse> => {
  const pokeList = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  let all = [];

  for (let i = 0; i < pokeList.data.results.length; i++) {
    let pokeDetails = await api.get(
      `/pokemon/${pokeList.data.results[i].name}`
    );

    const obj = {
      name: pokeDetails.data.name,
      id: pokeDetails.data.id,
      types: pokeDetails.data.types.map((typeObj) => typeObj.type.name),
      // types: pokeDetails.data.types[0].type.name,
      number: pokeDetails.data.id.toString().padStart(4, "0"),
      height: pokeDetails.data.height,
      abilities: pokeDetails.data.abilities,
      images: {
        front_default: pokeDetails.data.sprites.other.home.front_default,
        back_default: pokeDetails.data.sprites.back_default,
        front_shiny: pokeDetails.data.sprites.other.home.front_shiny,
        back_shiny: pokeDetails.data.sprites.back_shiny,
      },
    };

    all.push(obj);
  }

  const nextOffset = pokeList.data ? offset + 12 : null;

  return { all, nextOffset };
};

export async function LoadPokemon(
  name: string | string[]
): Promise<{ pokemon: Pokemon; evolutionChain: EvolutionChain }> {
  const pokeDetails = await api.get(`/pokemon/${name}`);
  const speciesUrl = pokeDetails.data.species.url;

  const speciesDetails = await api.get(speciesUrl);
  const evolutionChainUrl = speciesDetails.data.evolution_chain.url;
  const evolutionChainDetails = await api.get(evolutionChainUrl);

  const abilitiesUrl = pokeDetails.data.abilities[0].ability.url;
  const abilitiesDetails = await api.get(abilitiesUrl);

  const obj: Pokemon = {
    name: pokeDetails.data.name,
    id: pokeDetails.data.id,
    types: pokeDetails.data.types[0].type.name,
    number: pokeDetails.data.id.toString().padStart(4, "0"),
    height: pokeDetails.data.height,
    weight: pokeDetails.data.weight,
    species: speciesDetails.data.genera,
    abilities: pokeDetails.data.abilities,
    flavor_text: abilitiesDetails.data.flavour_text_entries,
    images: {
      front_default: pokeDetails.data.sprites.other.home.front_default,
      back_default: pokeDetails.data.sprites.other.home.back_default,
      front_shiny: pokeDetails.data.sprites.other.home.front_shiny,
      back_shiny: pokeDetails.data.sprites.back_shiny,
    },
  };

  const evolutionChain: EvolutionChain = evolutionChainDetails.data;

  return { pokemon: obj, evolutionChain };
}

export const typeColors = {
  grass: "#9BCC50",
  fire: "#FD7D24",
  water: "#4592C4",
  bug: "#729F3F",
  normal: "#A4ACAF",
  poison: "#B97FC9",
  electric: "#EED535",
  ground: "#E0C068",
  fairy: "#FDB9E9",
  fighting: "#D56723",
  psychic: "#F366B9",
  rock: "#A38C21",
  ghost: "#7B62A3",
  ice: "#51C4E7",
  dragon: "#F16E57",
  dark: "#707070",
  steel: "#9EB7B8",
  flying: "#3DC7EF",
};
