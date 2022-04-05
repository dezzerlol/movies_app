import { Avatar, Card, CardContent, Chip, Container, Divider, Grid, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import { setFilmItemThunk } from '../../../../store/FilmReducer'
import Loader from '../../../common/Loader'
import styled from '@emotion/styled'

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  color: var(--color);
  flex-direction: column;
  align-items: center;

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const CardContainer = styled(Card)`
  width: 260;
  height: 110;
  background-color: var(--container);
  color: var(--color);
`
const PageBox = styled(Box)`
  width: 650;
  height: '100%';
  margin-bottom: 30px;

  @media (min-width: 1200px) {
    margin-left: 5rem;
  }
`

const Image = styled.img`
  width: 250px;
  @media (min-width: 1200px) {
    width: 400px;
  }
`

const PosterBox = styled(Box)`
  margin-bottom: 3rem;
  width: 250px;
  height: 375px;

  @media (min-width: 1200px) {
    margin-bottom: 0;
    width: 400px;
    height: 375px;
  }
`

const FilmPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const filmItem = useSelector((state) => state.filmReducer.filmItem.item)
  const cast = useSelector((state) => state.filmReducer.filmItem.cast)
  const crew = useSelector((state) => state.filmReducer.filmItem.crew)

  useEffect(() => {
    window.scrollTo(0, 0)
    let type = matchPath('/movie/*', location.pathname) ? 'movie' : 'tv'
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

  const PeopleCard = (roleArr) => {
    return (
      <Grid container spacing={4}>
        {roleArr.map((role) => (
          <Grid item key={role.credit_id} xs={8} md={6}>
            <CardContainer>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h5'>{role.name}</Typography>
                  <Avatar src={`https://image.tmdb.org/t/p/original/${role.profile_path}`} sx={{ width: 60, height: 60 }} alt='actor pic' />
                </Box>
                <Box>
                  <Typography variant='caption' sx={{ color: 'var(--colorSecondary)' }}>
                    {role.character ? role.character : role.job}
                  </Typography>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <PageContainer>
      <PosterBox>
        <Image src={`https://image.tmdb.org/t/p/original/${filmItem.poster_path}`} alt='film poster' />
      </PosterBox>

      <PageBox>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ mr: 1 }}>
            {filmItem.original_title ? filmItem.original_title : filmItem.original_name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='caption' sx={{ mr: 4 }}>
            {filmItem.tagline}
          </Typography>
          <Typography variant='caption' sx={{ mr: 4 }}>
            {filmItem.runtime ? runTime(filmItem.runtime) : filmItem.first_air_date.slice(0, 4) + '-' + filmItem.last_air_date.slice(0, 4)}
          </Typography>
          <Typography variant='caption'>{filmItem.release_date ? filmItem.release_date.slice(0, 4) : ''}</Typography>
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
        <Divider sx={{ backgroundColor: 'var(--colorSecondary2)' }} />

        {filmItem.seasons && (
          <Box sx={{ mt: 6 }}>
            <Typography component='legend' variant='h6'>
              Seasons:
            </Typography>
            <Grid container spacing={1}>
              {filmItem.seasons.map((season) => (
                <Grid item key={season.name}>
                  <Card sx={{ mb: 2, width: 300, backgroundColor: 'var(--container)', color: 'var(--color)' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant='h6'>{season.name}</Typography>
                        </Box>
                        <Box sx={{ mb: 1, color: 'var(--colorSecondary)' }}>
                          <Typography variant='body2'>Out: {season.air_date}</Typography>
                        </Box>
                        <Box sx={{ mb: 1, color: 'var(--colorSecondary)' }}>
                          <Typography variant='body2'>Episodes: {season.episode_count}</Typography>
                        </Box>
                      </Box>
                      <Box>
                        {season.poster_path ? (
                          <img src={`https://image.tmdb.org/t/p/original/${season.poster_path}`} style={{ width: '120px' }} alt='company logo' />
                        ) : null}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h6'>
            Production:
          </Typography>
          {filmItem.budget && (
            <Box sx={{ mb: 2 }}>
              <Typography component='legend' variant='body2'>
                <b>Budget:</b> {filmItem.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
              </Typography>
              <Typography component='legend' variant='body2'>
                <b>Revenue:</b> {filmItem.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
              </Typography>
            </Box>
          )}
          <Grid container spacing={1}>
            {filmItem.production_companies.map((company) => (
              <Grid item key={company.name}>
                <Card sx={{ mb: 2, width: 300, height: 130, backgroundColor: 'var(--container)', color: 'var(--color)' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <Typography component='h6' variant='h6'>
                        {company.name}
                      </Typography>
                    </Box>
                    <Box>
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                          style={{ maxWidth: '100px', maxHeight: '70px', objectFit: 'cover', height: 'auto', width: 'auto' }}
                          alt='company logo'
                        />
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ backgroundColor: 'var(--colorSecondary2)' }} />

        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Cast:
          </Typography>
          {PeopleCard(cast)}
        </Box>

        {crew.length !== 0 && (
          <Box sx={{ mt: 10 }}>
            <Typography component='legend' variant='h5'>
              Crew:
            </Typography>
            {PeopleCard(crew)}
          </Box>
        )}
      </PageBox>
    </PageContainer>
  )
}

export default FilmPage
