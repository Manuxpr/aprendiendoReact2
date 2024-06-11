import { Box, Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, InputAdornment, Popover, TablePagination, Modal, FormControl, InputLabel, Select,SelectChangeEvent } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { fetchPokemonDataAbilities, fetchPokemonDataTable, fetchPokemonList } from "../../fetchPokemonData";
import { PokemonAbility, PokemonDataTable, TopLevel } from "../../interfaces/PokemonInterfaces";
import colors from '../../colors/colorsTheme';
import { FilterListRounded, InfoOutlined, SaveAltRounded, Search } from "@mui/icons-material";
import { useDebounce } from "../Debounce";
import { PokemonLegend, pokemonTypes } from "./LegendPokemonTypes";

export const PokemonTable = () => {
  const [pokemonData, setPokemonData] = useState<PokemonDataTable[]>([]);
  const [searchPokem, setSearchPokem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [ability, setAbility] = useState<PokemonAbility[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const handleModelOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const debouncedSearchTerm = useDebounce(searchPokem, 500);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const fetchData = async (offset: number, limit: number) => {
    const pokemonList: TopLevel = await fetchPokemonList(offset, limit);
    const data: PokemonDataTable[] = await Promise.all(
      pokemonList.results.map(async (result) => {
        const pokemon = await fetchPokemonDataTable(result.url);
        return pokemon;
      })
    );
    setPokemonData(data);
    setTotalPokemon(pokemonList.count);
  };

  const fetchPokemonAbilities = useCallback(async () => {
    const abilitiesList: TopLevel = await fetchPokemonDataAbilities();
    const data: PokemonAbility[] = abilitiesList.results.map(result => {
      return { name: result.name };
    });
    setAbility(data);
    return abilitiesList;
  }, []);

  useEffect(() => {
    fetchPokemonAbilities()
  }, [fetchPokemonAbilities]);

  useEffect(() => {
    fetchData(page * rowsPerPage, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPokem(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchPokemonList(newPage * rowsPerPage, rowsPerPage);
  };
  

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchPokemonList(0, newRowsPerPage);
  };

  const filteredPokemonData = debouncedSearchTerm
    ? pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : pokemonData;

  const handleLegendClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLegendClose = () => {
    setAnchorEl(null);
  };

  const [newPokemon, setNewPokemon] = useState({
    name: '',
    abilities: [],
    types: [],
    weight: '',
  });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPokemon({
      ...newPokemon,
      [name]: value,
    });
  };
    
  const handleSelectChange = (event: SelectChangeEvent<unknown[]>) => {
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value,
    });
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
          <Button variant="contained" color="secondary" endIcon={<SaveAltRounded/>} onClick={handleModelOpen}>AÑADIR POKEMON</Button>
          <Button variant="contained" color="secondary" endIcon={<FilterListRounded/>} style={{ marginLeft: '0.6rem' }}>BÚSQUEDA AVANZADA</Button>
          <Button variant="outlined" endIcon={<InfoOutlined />} style={{ marginLeft: '0.7rem' }} onClick={handleLegendClick}>LEYENDA</Button>
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
                    <Chip label={type.type.name} key={type.type.name} style={{ margin: '2px', backgroundColor: colors.chip[type.type.name] }} />
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
            <TablePagination
            component="div"
            count={totalPokemon}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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

      <Modal
  open={openModal}
  onClose={handleModalClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', 
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Nuevo Pokemon
    </Typography>
    <TextField
      name="name"
      value={newPokemon.name}
      onChange={handleInputChange}
      label="Nombre"
    />
    <FormControl>
      <InputLabel id="abilities-label">Habilidades</InputLabel>
      <Select
        labelId="abilities-label"
        name="abilities"
        multiple
        value={newPokemon.abilities}
        onChange={handleSelectChange}
      >
        {ability.map((ability) => {
          return (
            <Box key={ability.name} display="flex" alignItems="center" gap="1rem">
              <Button key={ability.name} variant="outlined" color="primary" sx={{marginRight:"0.2rem"}}>{ability.name}</Button>
            </Box>
          );
        })}
      </Select>
    </FormControl>
    <FormControl>
      <InputLabel id="types-label">Tipos</InputLabel>
      <Select
        labelId="types-label"
        name="types"
        multiple
        value={newPokemon.types}
        onChange={handleSelectChange}
      >
        {pokemonTypes.map((type) => (
          <Box key={type} display="flex" alignItems="center" gap="1rem">
            <Chip label={type.toUpperCase()} style={{ backgroundColor: colors.chip[type], color: 'white' }} />
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
          </Box>
        ))}
      </Select>
    </FormControl>
    <TextField
      name="weight"
      value={newPokemon.weight}
      onChange={handleInputChange}
      label="Peso"
    />
  </Box>
</Modal>
    </Box>
  );
}
