import { Paper, Typography, Box, Chip } from '@mui/material';
import colors from '../../colors/colorsTheme';
import { pokemonTypes } from '../pokemonType';



  
  export const PokemonLegend = () => {
    return (
      <Paper elevation={6} sx={{ padding: '1rem', maxWidth: '18rem',height: "50rem" }}>
        <Typography variant="h6" gutterBottom>Leyenda</Typography>
        <Box display="flex" flexDirection="column" gap="0.5rem">
          {pokemonTypes.map((type) => (
            <Box key={type} display="flex" alignItems="center" gap="1rem">
              <Chip label={type.toUpperCase()} sx={{ backgroundColor: colors.chip[type], color: 'white' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };