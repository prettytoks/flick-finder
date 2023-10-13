import React, { useState, useEffect } from 'react';
import { TextField, Grid, Pagination,Card, CardContent, CardMedia } from '@mui/material';
import { Box, Typography, Paper } from '@mui/material';
import MovieCard from './MovieCard';
import { ThemeProvider } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import {  theme, lightTheme, darkTheme, MainContent, PageContainer } from '../theme';

function Movies({ darkMode }) {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByTitle = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${searchText}&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchText) {
      fetchMoviesByTitle();
    } else {
      const fetchPopularMovies = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${currentPage}`
          );
          const data = await response.json();
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPopularMovies();
    }
  }, [currentPage, searchText]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
    
  useEffect(() => {
    const fetchCarouselMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setCarouselMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setCarouselLoading(false);
      }
    };
    fetchCarouselMovies();
  }, []);


  return (
    <>
        
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

        <PageContainer>
            
          <MainContent theme={theme} darkMode={darkMode}>
        
              {carouselLoading ? (
                <CircularProgress />
                ) : (
                <Carousel animation="slide" indicators={false} interval={7000}>
                  {carouselMovies.slice(0, 6).map((movie) => (
                    <Paper
                      key={movie.id}
                      sx={{ height: 830 }}
                    >
                      <Link to={`/${movie.id}`} style={{ textDecoration: 'none' }}>
                        <Card>
              
                          <CardContent>

                            <Typography color="textPrimary" variant="h4" align="center" gutterBottom mt={2}>
                                {movie.title}
                              </Typography>

                              <Typography color="textPrimary" variant="h6" align="center" gutterBottom>
                                {movie.overview}
                              </Typography>

                          </CardContent>

                          <CardMedia
                            component="img"
                            //image={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
                            image={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : 'https://powderalloy.com/wp-content/uploads/2015/11/sidebar-placeholder.png'}
                            alt={movie.title}
                            sx={{ objectFit: "cover", height: '100%' }}
                          />
                
                        </Card>
                      </Link>
                    </Paper>
                  ))}
                </Carousel>
              )}

              <Box sx={{ width: '100%', maxWidth: 350 }}>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Search movies"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearch}
                    sx={{ mb: 4, mt: 4 }}
                    InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="search" onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    }}
                    />

                  </Grid>

                </Box>
        
                <Grid item xs={12}>
                  {movies.length === 0 ? (
                    <Typography color="textPrimary">No movies found.</Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {movies.map((movie) => (
                        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                          <MovieCard movie={movie} />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>


                  <Grid container justifyContent="center" item xs={12}>
                  
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        //color="primary"
                        color="standard"
                        size="large"
                        sx={{ mt: 5, mb: 5 }}
                      />
                  
                  </Grid>

              </MainContent>

          </PageContainer>

        </ThemeProvider>
        
    </>
  );
};

export default Movies;