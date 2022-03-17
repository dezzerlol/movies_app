import { Avatar, Card, CardContent, Chip, Container, Divider, Grid, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import { setFilmItemThunk } from '../../../store/FilmReducer'
import Loader from '../../common/Loader'

const FilmPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const filmItem = useSelector((state) => state.filmReducer.filmItem.item)
  const castItem = useSelector((state) => state.filmReducer.filmItem.cast)
  const crewItem = useSelector((state) => state.filmReducer.filmItem.crew)

  useEffect(() => {
    let type = matchPath('/film/*', location.pathname) ? 'movie' : 'tv'
    console.log(type)
    dispatch(setFilmItemThunk(type, params.id))
  }, [])

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
            <Chip label={genre.name} sx={{ mr: 1, color: 'white', backgroundColor: '#1A1C20' }} key={genre.name} />
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
              <Grid item key={company.name}>
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
            {castItem.map((cast) => (
              <Grid item>
                <Card sx={{ width: 260, height: 110, backgroundColor: '#1A1C20', color: 'white' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='h5'>{cast.name}</Typography>
                      <Avatar src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} sx={{ width: 60, height: 60 }} alt='actor pic' />
                    </Box>
                    <Box>
                      <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                        as: {cast.character}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 10 }}>
          <Typography component='legend' variant='h5'>
            Crew:
          </Typography>
          <Grid container spacing={4}>
            {crewItem.map((crew) => (
              <Grid item>
                <Card sx={{ width: 260, height: 110, backgroundColor: '#1A1C20', color: 'white' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='h5'>{crew.name}</Typography>
                      <Avatar src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`} sx={{ width: 60, height: 60 }} alt='actor pic' />
                    </Box>
                    <Box>
                      <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                        {crew.job}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default FilmPage
