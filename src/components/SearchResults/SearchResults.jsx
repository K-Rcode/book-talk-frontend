import * as React from 'react';
import { CardActionArea, Typography, CardMedia, CardContent, Card, Grid, Divider } from '@mui/material';

export default function SearchResults({ result, handleClick }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
    <Card item sx={{ m: 4, width: 275, height: 325, backgroundColor: 'rgb(0, 21, 36, 0.7)', borderRadius: '1rem' }} md={6} xs={12} key={result.id} onClick={() => handleClick(result.id, result)} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : "https://image.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg"}
          alt={result.volumeInfo.title}
          sx={{ padding: 1, objectFit: 'contain', }}
          />
          <Divider sx={{ color:'#ffecd1', margin: 1 }} />
        <CardContent sx={{ color:"#ffecd1", padding: 1, }}>
            <Typography gutterBottom variant="p" component="div" sx={{ fontSize: '14px'}}>
            {result.volumeInfo.title}
          </Typography>
          <Typography variant="body2">
            By: {result.volumeInfo.authors ? result.volumeInfo.authors[0] : 'Unknown'}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
     </Grid>
  );
}
