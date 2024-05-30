import { useState } from 'react';
import { TextField, Button } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [savedData, setSavedData] = useState<{ email: string, password: string } | null>(null);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSavedData({ email, password });
  };

  const handleShowData = () => {
    if (savedData) {
      alert(`Email: ${savedData.email}, Password: ${savedData.password}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    }}>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          margin: 2,
          display: 'flex',
          marginTop: 2,
          borderColor: 'darkred',
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="outlined" color="error" type="submit"
        sx={{
          display: 'flex',
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 2,
        }} >
        Login
      </Button>
      <Button variant="outlined" color="primary" onClick={handleShowData}
        sx={{
          display: 'flex',
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 2,
        }} >
        datos guardados
      </Button>
    </form>
  );
}

export default Login;