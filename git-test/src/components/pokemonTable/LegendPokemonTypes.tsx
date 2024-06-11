import { Paper, Typography, Box, Chip } from '@mui/material';
import colors from '../../colors/colorsTheme';


export const pokemonTypes = [
    "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy",
    "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel"
  ];
  
export const PokemonLegend = () => {
    return (
      <Paper elevation={6} style={{ padding: '1rem', maxWidth: '18rem',height: "50rem" }}>
        <Typography variant="h6" gutterBottom>Leyenda</Typography>
        <Box display="flex" flexDirection="column" gap="0.5rem">
          {pokemonTypes.map((type) => (
            <Box key={type} display="flex" alignItems="center" gap="1rem">
              <Chip label={type.toUpperCase()} style={{ backgroundColor: colors.chip[type], color: 'white' }} />
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };