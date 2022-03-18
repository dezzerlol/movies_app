import { CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React from 'react'
import defaultPic from '../../../../images/defaultPic.jpg'
import styles from './Films.module.css'

const FilmItem = (props) => {
  return (
    <Grid item xs={'auto'}>
      <Card
        className={styles.filmItemImg}
        sx={{
          maxWidth: 230,
          maxHeight: 480,
          height: 480,
          color: 'var(--color)',
          backgroundColor: 'var(--container)',
        }}>
        <CardActionArea onClick={() => props.onClickHandle(props.id)}>
          <CardMedia component='img' image={props.poster ? `https://image.tmdb.org/t/p/w780/${props.poster}` : defaultPic} height='350' alt='film poster' />
        </CardActionArea>
        <CardContent>
          <Box sx={{ height: '70px' }}>
            <Typography
              variant='body1'
              component='h3'
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                fontFamily: 'Roboto',
                fontSize: '18px',
              }}>
              {props.title}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ ml: 1 }}>
          <Box>
            <Typography variant='caption' component='h3' sx={{ color: '#708898' }}>
              Rating: {props.rating}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default FilmItem
