import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Navbar from './components/Navbar';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (isDarkMode) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>

        <Router>

         <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <Routes>

            <Route exact path="/" element={<Movies darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          
            <Route exact path="/:id" element={<Movie darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          
          </Routes>

        </Router>
   
     </>
  );
}

export default App;
