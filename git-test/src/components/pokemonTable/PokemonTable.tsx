import { Box, Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, InputAdornment, Popover } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchPokemonDataTable } from "../../fetchPokemonData";
import { PokemonDataTable } from "../../interfaces/PokemonInterfaces";
import colors from '../../colors/colorsTheme';
import { FilterListRounded, InfoOutlined, SaveAltRounded, Search } from "@mui/icons-material";
import { useDebounce } from "../Debounce";
import { PokemonLegend } from "./LegendPokemonTypes";


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
  const [searchPokem, setSearchPokem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const debouncedSearchTerm = useDebounce(searchPokem, 500); 
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPokem(event.target.value);
  };

  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );


  const handleLegendClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLegendClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box margin="3rem">
      <Typography variant="h4" gutterBottom color="text">Pokemons</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Nombre del pokemon"
          value={searchPokem}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: "54rem" }}
        />
        <Box>
          <Button variant="contained" color="secondary" endIcon={<SaveAltRounded/>}>EXPORTAR TABLA</Button>
          <Button variant="contained" color="secondary" endIcon={<FilterListRounded/>} sx={{ marginLeft: '0.6rem' }}>BÚSQUEDA AVANZADA</Button>
          <Button variant="outlined" endIcon={<InfoOutlined />} sx={{ marginLeft: '0.7rem' }} onClick={handleLegendClick}>LEYENDA</Button>
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
            {filteredPokemonData.map((pokemon: PokemonDataTable) => (
              <TableRow key={pokemon.name}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>
                  {pokemon.types.map((type) => (
                    <Chip label={type.type.name} key={type.type.name} sx={{ margin: '2px', backgroundColor: colors.chip[type.type.name] }} />
                  ))}
                </TableCell>
                <TableCell>
                  {pokemon.abilities.map((ability) => (
                    <Button key={ability.ability.name} variant="outlined" color="primary" sx={{marginRight:"0.2rem"}}>{ability.ability.name}</Button>
                  ))}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" sx={{marginRight:"0.2rem"}}>{pokemon.weight} kgs</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleLegendClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PokemonLegend />
      </Popover>
    </Box>
  );
}