import { Card, Box, Button,TextField, IconButton, InputAdornment} from '@mui/material';
import colors from './colors/colorsTheme';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';


export const MainBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            {children}
        </Box>
    );
};

export const LoginCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card
        sx={{
            width: '552px',
            height: '653px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            boxShadow: 3,
            borderRadius: '12px',
            position: 'relative',
            opacity: '1',
            backgroundColor: colors.background.default, 
            color: colors.text.primary, 
          }}
        >
            {children}
        </Card>
    )
}

export const LoginBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '7px',
            marginBottom: '20px'
          }}
        >
            { children }
        </Box>
    )
}

export const LogoBox = ({ children }: { children: React.ReactNode })=> {
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '7px',
          }}
        >
            { children }
        </Box>
    )
}

export const LoginButton = ({ children }: { children: React.ReactNode })=> {
    return (
        <Button
        size="large"
            color="primary"
            disabled={false}
            variant="contained"
            startIcon={null}
            endIcon={null}
            sx={{
              width: '318px',
              height: '46px',
              padding: '10px 100px',
              gap: '0px',
              opacity: '0px',
              background: colors.primary.main,
              fontSize: '14px',
            }}
        >
            { children }
        </Button>
    )
}

export const LoginEmailTextField = ()=> {
    const [email, setEmail] = useState('');
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    return (
        <TextField
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '1.1rem', color: colors.text.primary }
            }}
            label="Email"
            variant="outlined"
            size='medium'
            value={email}
            onChange={handleEmailChange}
            sx={{ width: '552px', height: '56px', marginBottom: '10px' }}
            InputProps={{ style: { fontSize: '1.2rem' } }}
          />
    )
}

export const LoginPasswordTextField = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    return (
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
    )
}