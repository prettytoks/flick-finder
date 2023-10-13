import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <>

      <AppBar position="static" sx={{ backgroundColor: darkMode ? '#333' : 'cornflowerblue' }}>

        <Toolbar>

          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: darkMode ? '#fff' : '#333' }}>Flick Finder</Link>
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle dark mode"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        
        </Toolbar>

      </AppBar>

</>
   
  );
};

export default Navbar;

