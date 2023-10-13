import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, CardMedia, ThemeProvider } from '@mui/material';
import { Box, Typography, Rating } from '@mui/material';
import {  theme, lightTheme, darkTheme, MainContent, PageContainer } from '../theme';
import CircularProgress from '@mui/material/CircularProgress';

//function Movie() {
  const Movie = ({ darkMode, toggleDarkMode }) => {
  const { id } = useParams(); // get the movie ID from the URL params
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(error => console.log(error));
  }, [id]);

  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`)
      .then(response => response.json())
      .then(data => setCast(data.cast))
      .catch(error => console.log(error))
      .finally (setLoading(false));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }


  return (
    <>
  
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

          <PageContainer>

              <MainContent theme={theme} darkMode={darkMode}>

                  <Grid container spacing={2} mt={2}>

                      <Grid item xs={12} lg={4}>
              
                        <CardMedia
                            sx={{  height: 730, borderRadius: '5px', mr: 2, boxShadow: 5 }}
                            image={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://powderalloy.com/wp-content/uploads/2015/11/sidebar-placeholder.png'}
                            title={movie.title}
                          />

                      </Grid>

                      <Grid item container direction="column" lg={8}>
                          <Typography color="textPrimary" variant="h4" align="center" gutterBottom>
                            {movie?.title} 

                          </Typography>

                          <Typography color="textPrimary" variant="h6" align="center" gutterBottom mb={1}>
                            {new Date(movie?.release_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>

                          <Typography color="textPrimary" variant="h5" gutterBottom>
                            {movie?.tagline}
                          </Typography>

                          <Typography color="textPrimary" variant="h6" gutterBottom mt={1} mb={3}>
                            {movie?.overview}
                          </Typography>

                          <Grid item>

                            <Box display="flex" align="center">

                              <Rating readOnly value={movie.vote_average / 2} />

                              <Typography  color="textPrimary" gutterBottom variant="subtitle1" style={{ marginLeft: '15px' }}>
                                {movie?.vote_average} / 10  ({movie.vote_count} votes)  {movie?.runtime}min
                              </Typography>
                            </Box>
                        
                          </Grid>

                          <Typography color="textPrimary" variant="subtitle1">
                            {movie?.genres.map((genre) => genre.name).join(", ")}
                          </Typography>


                          {loading ? (
                            <CircularProgress />
                          ) : (
                            <>
                              <Typography color="textPrimary" variant="h4" mt={4} mb={2}>Top Cast</Typography>

                              <Grid item container spacing={2}>
                                {cast?.map((character, i) => (
                                  character.profile_path && (
                                  <Grid key={i} item xs={6} sm={4} md={2}>
                          
                                    <CardMedia
                                        sx={{ height: 220, borderRadius: '5px', mr: 1, mb: 2, boxShadow: 4 }}
                                        image={`https://www.themoviedb.org/t/p/w500${character.profile_path}`}
                                        title={movie.title}
                                      />

                                    <Typography color="textPrimary" align="center">{character?.name}</Typography>
                                    <Typography color="textSecondary" align="center">
                                      {character.character.split('/')[0]}
                                    </Typography>

                                  </Grid>
                                )
                                )).slice(0, 6)}
                              </Grid>
                            </>
                          )}

                      </Grid>

                    </Grid>

                </MainContent>

            </PageContainer>
            
        </ThemeProvider>
                  
    </>
    
  );
}

export default Movie;