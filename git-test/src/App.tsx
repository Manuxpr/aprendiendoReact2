import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import "./App.css";
import LoginNeoCK from "./components/LoginNeoCK/loginNeoCK";
import { AuthGuard } from "./auth/AuthGuard";
import { PokemonTable } from "./components/pokemonTable/PokemonTable";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && (
        <AppBar color='transparent' position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Router Prueba
            </Typography>
            <Button color="inherit" component={Link} to="/pokemonTable">Pokemon Table</Button>
            <Button color="inherit" component={Link} to="/" onClick={handleLogOut}>Logout</Button>
          </Toolbar>
        </AppBar>
      )}
      <Routes>
        <Route path="/" element={<LoginNeoCK onLoginSuccess={handleLoginSuccess} />} />
        <Route element={<AuthGuard />}>
          <Route path="/pokemonTable" element={<PokemonTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


