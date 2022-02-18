import * as React from 'react';
import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material';

export default function SearchResults({ result, handleClick }) {
    return (
    <Card sx={{ maxWidth: 245, m: 2 }} key={result.id} onClick={() => handleClick(result.id, result)} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : "https://image.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg"}
          alt={result.volumeInfo.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {result.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By: {result.volumeInfo.authors ? result.volumeInfo.authors[0] : 'Unknown'}
          </Typography>
        </CardContent>
      </CardActionArea>
            </Card>
  );
}
