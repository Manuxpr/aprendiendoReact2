import { useState } from "react";
import {Button, Card, CardContent, CardMedia, Typography, CardHeader, Avatar, Box, IconButton } from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PokemonData {
    name: string;
    abilities: { ability: { name: string } }[];
    sprites: { front_default: string };
  }

const Home = () => {
    const [data, setData] = useState<PokemonData | null>(null); 
    const fetchData = async () => {
        const endpointUrl = import.meta.env.VITE_ENDPOINT_URL;
        const response = await fetch(endpointUrl);
        const data: PokemonData = await response.json();
        setData(data);
    }

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Button variant="outlined" color="secondary" onClick={fetchData} 
            sx={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    borderWidth: '2px',
                    '&:hover': {
                        borderColor: 'darkpurple',
                        color: 'darkpurple',
                    }
                }}>
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
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    

                }}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="pokemon">
                            {data.name.charAt(0).toUpperCase()}
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={data.name.toUpperCase()}
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
                </Card>
            )}
        </Box>
    )
}

export default Home;
