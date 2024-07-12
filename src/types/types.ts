export interface Pokemon {
    name: string;
    genus: string;
    id: number;
    types: string[];
    number: string;
    height: number;
    species: string;
    flavor_text: string;
    weight: number;
    abilities: any[];
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
    abilities: any[];
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
                name: string;
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