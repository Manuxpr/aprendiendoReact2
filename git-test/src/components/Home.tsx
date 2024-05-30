import { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, CardHeader, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos de React Quill

interface PokemonData {
  name: string;
  abilities: Ability[];
  sprites: Sprites;
}

export interface Ability {
  ability:   Species;
  is_hidden: boolean;
  slot:      number;
}

export interface Species {
  name: string;
  url:  string;
}

export interface Sprites {
  back_default:       string;
  back_female:        null;
  back_shiny:         string;
  back_shiny_female:  null;
  front_default:      string;
  front_female:       null;
  front_shiny:        string;
  front_shiny_female: null;
  animated?:          Sprites;
}

const Home = () => {
  const [data, setData] = useState<PokemonData | null>(null);
  const [editorContent, setEditorContent] = useState('');

  const fetchData = async () => {
    const endpointUrl = import.meta.env.VITE_ENDPOINT_URL;
    const response = await fetch(endpointUrl);
    const data: PokemonData = await response.json();
    setData(data);
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        onClick={fetchData}
        sx={{
          marginTop: '20px',
          marginBottom: '20px',
          padding: '10px 20px',
          borderRadius: '12px',
          borderWidth: '2px',
          '&:hover': {
            borderColor: 'darkpurple',
            color: 'darkpurple',
          },
        }}
      >
        Traer datos de la API
      </Button>
            {data && (
        <Card
          sx={{
            width: '300px',
            mt: 2,
            boxShadow: 3,
            borderRadius: '12px',
            borderColor: 'darkpurple',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '20px',
          }}
        >
          <CardHeader
            avatar={data.name.charAt(0).toUpperCase()
              
             } 
            title={
              <Typography variant="h6" color="text.primary">
                {data.name.toUpperCase()}
              </Typography>
            }
            subheader="Pokemon Abilities"
            sx={{ textAlign: 'center' }}
          />
          <CardMedia
            component="img"
            height="194"
            image={data.sprites.front_default}
            alt={data.name}
            sx={{ objectFit: 'contain', marginTop: '10px' }}
          />
          <CardContent sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h6" color="text.primary">
              Abilities:
            </Typography>
            {data.abilities.map((ability, index) => (
              <Typography variant="body2" color="text.secondary" key={index}>
                {ability.ability.name}
              </Typography>
            ))}
          </CardContent>
          <Box sx={{ width: '100%', mt: 2 }}>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Prueba de texto"
              style={{ backgroundColor: 'white', borderRadius: '8px' }}
            />
          </Box>
        </Card>
      )}

    </Box>
  );
};



export default Home;




