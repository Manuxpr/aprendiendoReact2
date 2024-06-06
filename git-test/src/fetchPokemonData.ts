import { PokemonData,PokemonDataTable } from './interfaces/PokemonInterfaces';

export const fetchPokemonData = async (): Promise<PokemonData> => {
  const endpointUrl = import.meta.env.VITE_ENDPOINT_URL;
  const response = await fetch(endpointUrl);
  const data: PokemonData = await response.json();
  return data;
};

export const fetchPokemonDataTable = async (pokemonName: string): Promise<PokemonDataTable> => {
  const endpointUrl = `${import.meta.env.VITE_ENDPOINT_URL}/${pokemonName}`;
  const response = await fetch(endpointUrl);
  const data: PokemonDataTable = await response.json();
  return {
    name: data.name,
    types: data.types,
    abilities: data.abilities,
    weight: data.weight
  };
};
