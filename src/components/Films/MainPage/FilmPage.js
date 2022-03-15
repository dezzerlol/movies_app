import { Avatar, Card, CardContent, Chip, Container, Divider, Grid, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../common/Loader'

const FilmPage = () => {
  const filmItem = useSelector((state) => state.filmReducer.filmItem)

  if (!filmItem) {
    return <Loader />
  }

  const runTime = (timestamp) => {
    let hours = Math.floor(timestamp / 60)
    let minutes = timestamp % 60
    return hours + 'h ' + minutes + 'm '
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
      }}>
      <Box sx={{ width: 501, height: 751 }}>
        <img src={`https://image.tmdb.org/t/p/original/${filmItem.poster_path}`} alt='film poster' style={{ width: '400px' }} />
      </Box>

      <Box sx={{ width: 650, height: '100%', mb: 15 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ mr: 1 }}>
            {filmItem.original_title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='caption' sx={{ mr: 4 }}>
            {filmItem.tagline}
          </Typography>
          <Typography variant='caption' sx={{ mr: 4 }}>
            {runTime(filmItem.runtime)}
          </Typography>
          <Typography variant='caption'>{filmItem.release_date.slice(0, 4)}</Typography>
        </Box>
        <Box sx={{ mt: 6 }}>
          {filmItem.genres.map((genre) => (
            <Chip label={genre.name} sx={{ mr: 1, color: 'white', backgroundColor: '#1A1C20' }} />
          ))}
        </Box>
        <Typography variant='h6'>{filmItem.overview}</Typography>

        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Rating: {filmItem.vote_average}
          </Typography>
          <Rating name='read-only' value={filmItem.vote_average} readOnly max={10} size='large' />
        </Box>
        <Divider sx={{ backgroundColor: 'white' }} />
        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h6'>
            Production:
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography component='legend' variant='body2'>
              <b>Budget:</b> {filmItem.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
            </Typography>
            <Typography component='legend' variant='body2'>
              <b>Revenue:</b> {filmItem.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {filmItem.production_companies.map((company) => (
              <Grid item>
                <Card sx={{ mb: 2, width: 300, backgroundColor: '#1A1C20', color: 'white' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant='body2'>{company.name}</Typography>
                    </Box>
                    <Box>
                      {company.logo_path ? (
                        <img src={`https://image.tmdb.org/t/p/original/${company.logo_path}`} style={{ width: '120px' }} alt='company logo' />
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ backgroundColor: 'white' }} />

        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Cast:
          </Typography>

          <Grid container spacing={4}>
            <Grid item>
              <Card sx={{ width: 260, height: 110, backgroundColor: '#1A1C20', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '30px' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                    as: Actor role
                  </Typography>
                  <Typography variant='body2'>
                    <b>Birth date:</b> 00-00-1900
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: 260, height: 110, backgroundColor: '#1A1C20', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '30px' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                    as: Actor role
                  </Typography>
                  <Typography variant='body2'>
                    <b>Birth date:</b> 00-00-1900
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: 260, height: 110, backgroundColor: '#1A1C20', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '30px' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                    as: Actor role
                  </Typography>
                  <Typography variant='body2'>
                    <b>Birth date:</b> 00-00-1900
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: 260, height: 110, backgroundColor: '#1A1C20', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '30px' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                    as: Actor role
                  </Typography>
                  <Typography variant='body2'>
                    <b>Birth date:</b> 00-00-1900
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default FilmPage
