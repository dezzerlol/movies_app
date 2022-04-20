import styled from '@emotion/styled'
import { Badge, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React from 'react'
import defaultPic from '../../../images/defaultPic.jpg'


const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    backgroundColor: '#574240',
    color: 'white',
    top: 15,
    right: 215,
  },
})

const FilmItem = (props) => {
  return (
    <Grid item xs={'auto'}>
      <StyledBadge badgeContent={props.rating}>
        <Card
          className={'filmItemImg'}
          sx={{
            width: 230,

            height: 480,
            color: 'var(--color)',
            backgroundColor: 'var(--container)',
          }}>
          <CardActionArea onClick={() => props.onClickHandle(props.id)}>
            <CardMedia 
            component='img' 
            image={props.poster ? `https://image.tmdb.org/t/p/w780/${props.poster}` : defaultPic} 
            height='350' 
            alt='film poster' />
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
                {props.releaseDate.slice(0, 4)}
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </StyledBadge>
    </Grid>
  )
}

export default FilmItem
