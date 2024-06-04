import { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, CardHeader, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { PokemonData } from '../../interfaces/PokemonInterfaces';
import { fetchPokemonData } from '../../fetchPokemonData';




const Home = () => {

  const [data, setData] = useState<PokemonData | null>(null);
  const [editorContent, setEditorContent] = useState('');

  const handleFetchData = async () => {
    const data = await fetchPokemonData();
    setData(data);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleFetchData}
      
      >
        Traer datos de la API
      </Button>
      {data && (
        <Card >
          <CardHeader
            avatar={data.name.charAt(0).toUpperCase()}
            title={
              <Typography variant="h6" color="text.primary">
                {data.name.toUpperCase()}
              </Typography>
            }
            subheader="Pokemon Abilities"
      
          />
          <CardMedia
            component="img"
            height="194"
            image={data.sprites.front_default}
            alt={data.name}
            
          />
          <CardContent>
            <Typography variant="h6" color="text.primary">
              Abilities:
            </Typography>
            {data.abilities.map((ability, index) => (
              <Typography variant="body2" color="text.secondary" key={index}>
                {ability.ability.name}
              </Typography>
            ))}
          </CardContent>
          <Box>
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
