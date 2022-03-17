import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { setNowInTheTheatresThunk, setPopularFilmsThunk, setPopularTvShows, setTopRatedFilmsThunk, setUpcomingFilmsThunk } from '../../../store/FilmReducer'
import Loader from '../../common/Loader'
import FilmItem from '../FilmItem'
import FilmSearchField from '../FilmSearch/FilmSearchField'

const Films = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const films = useSelector((state) => state.filmReducer.films, shallowEqual)
  const [fav, setFav] = useState(false)

  const addToFavorites = (e) => {
    setFav(!fav)
  }

  const onClickHandle = (id) => {
    let type = matchPath('/movies/*', location.pathname) ? 'movie' : 'tv'
    if (type === 'movie') {
      return navigate(`/film/${id}`)
    } else {
      return navigate(`/show/${id}`)
    }
  }

  useEffect(() => {
    switch (location.pathname) {
      case '/movies/popular':
        return dispatch(setPopularFilmsThunk())
      case '/movies/in_theatres':
        return dispatch(setNowInTheTheatresThunk())
      case '/movies/upcoming':
        return dispatch(setUpcomingFilmsThunk())
      case '/movies/top_rated':
        return dispatch(setTopRatedFilmsThunk())
      case '/shows/popular':
        return dispatch(setPopularTvShows())
      default:
        return dispatch(setPopularFilmsThunk())
    }
  }, [location.pathname])

  if (!films) {
    return <Loader />
  }

  const filmsOutput = films.map((film) => {
    return (
      <FilmItem
        key={film.id}
        id={film.id}
        poster={film.poster_path}
        title={film.title ? film.title : film.name}
        rating={film.vote_average}
        fav={fav}
        onClickHandle={onClickHandle}
        addToFavorites={addToFavorites}
      />
    )
  })

  return (
    <Container>
      <FilmSearchField />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' sx={{ color: 'white', fontFamily: 'Roboto' }}>
          {location.pathname}
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent='center' alignItems='center' sx={{ mb: '1.5rem' }}>
        {filmsOutput}
      </Grid>
    </Container>
  )
}

export default Films
