import { PokemonData } from './PokemonInterfaces';

const fetchPokemonData = async (): Promise<PokemonData> => {
  const endpointUrl = import.meta.env.VITE_ENDPOINT_URL;
  const response = await fetch(endpointUrl);
  const data: PokemonData = await response.json();
  return data;
};

export default fetchPokemonData;