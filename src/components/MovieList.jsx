import React from 'react';
import MovieCard from './MovieCard';
import { Grid } from '@mui/material';

function MovieList(props) {
  const { movies, darkMode, toggleDarkMode } = props;

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <MovieCard movie={movie} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;
