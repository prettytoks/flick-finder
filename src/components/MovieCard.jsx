import React from 'react';
import { CardMedia, Typography, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function MovieCard(props) {
 
  const { movie } = props;

  return (
    <>
   
      <Link to={`/${movie.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          sx={{ height: 306, borderRadius: '5px', mr: 1, mb: 2 }}
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://powderalloy.com/wp-content/uploads/2015/11/sidebar-placeholder.png'}
          title={movie.title}
        />

        <Typography  color="textPrimary" variant="h5">{movie.title}</Typography>

        <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
          <div>
            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
          </div>
        </Tooltip>

      </Link>

    </>

  );
}

export default MovieCard;