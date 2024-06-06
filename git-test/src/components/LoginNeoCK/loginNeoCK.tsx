import {  Box, Typography, Link, IconButton, InputAdornment, TextField} from '@mui/material';
import logo from '../../../public/logo.png';
import colors from '../../colors/colorsTheme';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { StyleLoginCard, StyleLogoBox, StyleUpperLoginBox, StyledCardContainer, StyledLoginButton } from './loginNeoCK.styles';


const LoginNeoCK = () => {

  const [user, setUser] = useState<string>('');
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try{
      const response = await fetch(import.meta.env.VITE_ENDPOINT_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, password}),
      });

      const data = await response.json();
      const accessToken = data.access_token;
      localStorage.setItem('accessToken', accessToken);
      alert('Login correcto');
    }catch(error){
      console.log('Error en el login', error);
    }
  }
  return (
    <>
      <StyledCardContainer>
        <StyleLoginCard>
          <StyleUpperLoginBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box component="img" src={logo} sx={{ width: 71, height: 71.7, marginBottom: "10px" }} />
              <Typography variant="h4" align="center">
                Bienvenid@ a
              </Typography>
              <StyleLogoBox>
                <Typography variant="h4" align="center" color="yellow" sx={{fontWeight: 'bold' }}>
                  neoTOOLS
                  <Box component="span" color='grey' sx={{  fontWeight: 'normal' }}> by neoCK</Box>
                </Typography>
              </StyleLogoBox>
            </Box>
          </StyleUpperLoginBox>
          <TextField
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '1.1rem', color: colors.text.primary }
            }}
            label="Email"
            variant="outlined"
            size='medium'
            value={user}
            onChange={handleUserChange}
            sx={{ width: '552px', height: '56px', marginBottom: '10px' }}
            InputProps={{ style: { fontSize: '1.2rem' } }}
          />
          <TextField
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '1.1rem', color: colors.text.primary }
            }}
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            size='medium'
            value={password}
            onChange={handlePasswordChange}
            sx={{ width: '552px', height: '56px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Link variant="body2" sx={{ marginBottom: '10px', color: colors.text.primary }}>
            ¿Has olvidado tu contraseña?
          </Link>
          <StyledLoginButton
            size="large"
                color="primary"
                disabled={false}
                variant="contained"
                startIcon={null}
                endIcon={null}
                onClick={handleLogin}   
            >
            INICIAR SESIÓN
          </StyledLoginButton>
        </StyleLoginCard>
      </StyledCardContainer>
      <Typography variant="body2" color="text" sx={{ marginTop: '20px', display: "flex" }}>
        ¿Tienes problemas para iniciar sesión? <a href="mailto:soporte@neock.es">soporte@neock.es</a>
      </Typography>
    </>
  );
}

export default LoginNeoCK;
