import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import LoginNeoCK from "./components/loginNeoCK";

function App() {
  return (
    <Router>
      <AppBar color='transparent' position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Router Prueba
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/loginNeoCK">LoginNEOCK</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/loginNeoCK" element={<LoginNeoCK />} />
      </Routes>
    </Router>
  );
}

export default App;