import * as React from 'react';
import { CardActionArea, Typography, CardMedia, CardContent, Card, Grid } from '@mui/material';

export default function SearchResults({ result, handleClick }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ m: 2, width: 275, height: 325, backgroundColor: 'rgb(0, 21, 36, 0.7)', borderRadius: '1rem' }} item md={6} xs={12} key={result.id} onClick={() => handleClick(result.id, result)} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : "https://image.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg"}
          alt={result.volumeInfo.title}
          sx={{ padding: 1, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color="#ffecd1">
            {result.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="#ffecd1">
            By: {result.volumeInfo.authors ? result.volumeInfo.authors[0] : 'Unknown'}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
     </Grid>
  );
}
