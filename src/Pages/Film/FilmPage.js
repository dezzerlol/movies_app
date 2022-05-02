import styled from '@emotion/styled'
import { Chip, Container, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import { getFilmItemUserStats } from '../../redux/AccountReducer'
import { removeFilmItemThunk, setFilmItemThunk } from '../../redux/FilmReducer'
import FavButton from './components/FavButton'
import FilmRating from './components/FilmRating'
import PeopleCard from './components/PeopleCard'
import ProductionCard from './components/ProductionCard'
import RateButton from './components/RateButton'
import Seasons from './components/Seasons'
import WatchLaterButton from './components/WatchLaterButton'

const PageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  color: var(--color);
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
  }
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
  const userRating = useSelector((state) => state.filmReducer.filmItem.userRating)
  const userReview = useSelector((state) => state.filmReducer.filmItem.userReview)
  const cast = useSelector((state) => state.filmReducer.filmItem.cast)
  const crew = useSelector((state) => state.filmReducer.filmItem.crew)
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)

  const [rating, setUserRating] = useState(userRating)

  useEffect(() => {
    window.scrollTo(0, 0)
    let type = matchPath('/movie/*', location.pathname) ? 'movie' : 'tv'
    dispatch(setFilmItemThunk(type, params.id))

    return () => {
      dispatch(removeFilmItemThunk())
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      dispatch(getFilmItemUserStats(params.id))
    }
  }, [loggedIn])

  useEffect(() => {
    setUserRating(userRating)
  }, [userRating])

  if (!filmItem) {
    return <Loader />
  }

  const runTime = (timestamp) => {
    let hours = Math.floor(timestamp / 60)
    let minutes = timestamp % 60
    return hours + 'h ' + minutes + 'm '
  }

  return (
    <PageContainer>
      <PosterBox>
        <Image src={`https://image.tmdb.org/t/p/original/${filmItem.poster_path}`} alt='film poster' />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FavButton filmItem={filmItem} />
          <WatchLaterButton filmItem={filmItem} />
          <RateButton filmItem={filmItem} setUserRating={setUserRating} userRating={userRating} userReview={userReview} />

          <Typography variant='body' sx={{ color: 'var(--colorSecondary)' }}>
            {rating}
          </Typography>
        </Box>
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

        <FilmRating vote_average={filmItem.vote_average} />

        {filmItem.seasons && <Seasons seasons={filmItem.seasons} />}

        <ProductionCard companies={filmItem.production_companies} budget={filmItem.budget} />

        <Divider sx={{ backgroundColor: 'var(--colorSecondary2)' }} />

        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Cast:
          </Typography>
          <PeopleCard roleArr={cast} />
        </Box>

        {crew.length !== 0 && (
          <Box sx={{ mt: 10 }}>
            <Typography component='legend' variant='h5'>
              Crew:
            </Typography>
            <PeopleCard roleArr={crew} />
          </Box>
        )}
      </PageBox>
    </PageContainer>
  )
}

export default FilmPage
