import { Box, Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchPokemonDataTable } from "../../fetchPokemonData";
import { PokemonDataTable } from "../../interfaces/PokemonInterfaces";
import colors from '../../colors/colorsTheme';
import { Search } from "@mui/icons-material";


const pokemonNames = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "jigglypuff",
  "meowth",
  "psyduck",
  "snorlax",
  "eevee",
  "vulpix",
  "gengar",
  "lapras",
  "dragonite"
];



export const PokemonTable = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDataTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: PokemonDataTable[] = [];
      for (const name of pokemonNames) {
        const result = await fetchPokemonDataTable(name);
        data.push(result);
      }
      setPokemonData(data);
    };

    fetchData();
  }, []);
  
  console.log(pokemonData);


  return (
    <Box margin="3rem">
      <Typography variant="h4" gutterBottom color="text">Pokemons</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Nombre del pokemon"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search/>
              </InputAdornment>
            ),
          }}
          sx={{ width:"54rem"}}

        />
        <Box>
          <Button variant="contained" color="secondary">EXPORTAR TABLA</Button>
          <Button variant="contained" color="secondary" style={{ marginLeft: '0.6rem' }}>BÚSQUEDA AVANZADA</Button>
          <Button variant="outlined" style={{ marginLeft: '0.7rem' }}>LEYENDA</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipos</TableCell>
              <TableCell>Habilidades</TableCell>
              <TableCell>Peso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonData.map((pokemon: PokemonDataTable) => (
              <TableRow key={pokemon.name}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>
                  {pokemon.types.map((type) => (
                    <Chip label={type.type.name} key={type.type.name} style={{ margin: '2px',backgroundColor:colors.chip[type.type.name]}} />
                  ))}
                </TableCell>
                <TableCell>
                  {pokemon.abilities.map((ability) => (
                    <Chip label={ability.ability.name} key={ability.ability.name} style={{ margin: '2px' }} />
                  ))}
                </TableCell>
                <TableCell>{pokemon.weight} kgs</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography>Página 1 de 13</Typography>
        <Typography>Total: 15892 usuarios</Typography>
      </Box>
    </Box>
  );
}