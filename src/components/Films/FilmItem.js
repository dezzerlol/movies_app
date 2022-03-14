import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import React from 'react'
import styles from './Films.module.css'

const FilmItem = (props) => {
  return (
    <Grid item xs={'auto'}>
      <Card className={styles.filmItemImg} sx={{ maxWidth: 230, maxHeight: 520, height: 520 }}>
        <CardActionArea onClick={() => props.onClickHandle(props.id)}>
          <CardMedia component='img' image={`https://image.tmdb.org/t/p/w780/${props.poster}`} height='350' alt='film poster' />
        </CardActionArea>
        <CardContent>
          <Typography
            variant='h6'
            component='h3'
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}>
            {props.title}
          </Typography>
          <Typography variant='body1'>Rating: {props.rating} </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default FilmItem
