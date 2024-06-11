export interface TopLevel {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
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

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}
