import {  Box, Typography, Link } from '@mui/material';
import logo from '../../public/logo.png';
import colors from './colors/colorsTheme';
import { MainBox,LoginCard ,LoginBox,LogoBox,LoginButton, LoginEmailTextField, LoginPasswordTextField} from './loginComponents';
import { useState } from 'react';


const LoginNeoCK = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  };
  return (
    <>
      <MainBox>
        <LoginCard>
          <LoginBox>
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
              <LogoBox>
                <Typography variant="h4" align="center" sx={{ color: colors.yellow, fontWeight: 'bold' }}>
                  neoTOOLS
                  <Box component="span" sx={{ color:colors.grey[200], fontWeight: 'normal' }}> by neoCK</Box>
                </Typography>
              </LogoBox>
            </Box>
          </LoginBox>
          <LoginEmailTextField email={email} handleEmailChange={handleEmailChange}/>
          <LoginPasswordTextField  password={password} handlePasswordChange={handlePasswordChange} showPassword={showPassword} handlePasswordVisibility={handlePasswordVisibility} />
          <Link variant="body2" sx={{ marginBottom: '10px', color: colors.text.primary }}>
            ¿Has olvidado tu contraseña?
          </Link>
          <LoginButton email={email} password={password}>
            INICIAR SESIÓN
          </LoginButton>
        </LoginCard>
      </MainBox>
      <Typography variant="body2" sx={{ marginTop: '20px', display: "flex", color: colors.text.primary }}>
        ¿Tienes problemas para iniciar sesión? <a href="mailto:soporte@neock.es">soporte@neock.es</a>
      </Typography>
    </>
  );
}

export default LoginNeoCK;
