import { Card, Box, Button,TextField, IconButton, InputAdornment} from '@mui/material';
import colors from './colors/colorsTheme';
import { ChangeEvent, FC } from 'react';
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

interface LoginButtonProps {
    children: React.ReactNode;
    email: string;
    password: string;
}


export const LoginButton:FC<LoginButtonProps> = ({ children,email,password })=> {
    const handleLogin = async () => {
        try {
          const response = await fetch('https://dev.neock.es/api/sac/v2/unlogged/login.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: email,
              password: password,
            }),
          });
    
          const data = await response.json();
          const accessToken = data.access_token;
    
          console.log('Access Token:', accessToken);
    
        } catch (error) {
          console.error('Error:', error);
        }
      };

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
            onClick={handleLogin}
        >
            { children }
        </Button>
    )
}
interface LoginEmailTextFieldProps {
    email: string;
    handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

export const  LoginEmailTextField: FC<LoginEmailTextFieldProps> = ({ email, handleEmailChange })=> {
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

interface LoginPasswordTextFieldProps {
    password: string;
    handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    handlePasswordVisibility: () => void;
  }

export const LoginPasswordTextField: FC<LoginPasswordTextFieldProps> = ({ password, handlePasswordChange, showPassword, handlePasswordVisibility }) => {
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