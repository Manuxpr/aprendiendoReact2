export interface PokemonData {
  name: string;
  abilities: Ability[];
  sprites: Sprites;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  animated?: Sprites;
}

export interface PokemonDataTable {
  name: string;
  types: Type[];
  abilities: Ability[];
  weight: number;
}

export interface Type {
  slot: number;
  type: Species;
}



