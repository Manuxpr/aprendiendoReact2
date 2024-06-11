import { TopLevel, PokemonDataTable } from './interfaces/PokemonInterfaces';

export const fetchPokemonList = async (offset: number, limit: number): Promise<TopLevel> => {
  const endpointUrl =`${import.meta.env.VITE_ENDPOINT_URLPOKEMONS}?offset=${offset}&limit=${limit}`;
  const response = await fetch(endpointUrl);
  const data: TopLevel = await response.json();
  return data;
};

export const fetchPokemonDataTable = async (url: string): Promise<PokemonDataTable> => {
  const response = await fetch(url);
  const data: PokemonDataTable = await response.json();
  return {
    name: data.name,
    types: data.types,
    abilities: data.abilities,
    weight: data.weight,
  };
};

export const fetchPokemonDataAbilities = async (): Promise<TopLevel> => {
  const endpointUrl = import.meta.env.VITE_ENDPOINT_URLABILITIES;
  const response = await fetch(endpointUrl);
  const data: TopLevel = await response.json();
  return data;
};
