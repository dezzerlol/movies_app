import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import {
  actions,
  setNowInTheTheatresThunk,
  setPopularFilmsThunk,
  setPopularTvShows,
  setTopRatedFilmsThunk,
  setTopRatedTvShows,
  setUpcomingFilmsThunk
} from '../../redux/FilmReducer'
import FilmsOutput from './components/FilmsOutput'
import FilmSearchField from './components/FilmSearchField'

const Films = () => {
  const currentPage = useSelector((state) => state.filmReducer.currentPage)
  const films = useSelector((state) => state.filmReducer.films)
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [section, setSection] = useState('')

  const loadMoreFilms = () => {
    dispatch(actions.setCurrentPage(currentPage + 1))
    setSearchParams({ page: String(currentPage + 1) })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    let queryPage = searchParams.get('page')
    if (queryPage === null) {
      queryPage = 1
    }

    switch (location.pathname) {
      case '/movies/popular':
        setSection('Popular movies')
        return dispatch(setPopularFilmsThunk(queryPage))

      case '/movies/in_theatres':
        setSection('In theatres')
        return dispatch(setNowInTheTheatresThunk(currentPage))

      case '/movies/upcoming':
        setSection('Upcoming')
        return dispatch(setUpcomingFilmsThunk(currentPage))

      case '/movies/top_rated':
        setSection('Top rated')
        return dispatch(setTopRatedFilmsThunk(currentPage))

      case '/shows/popular':
        setSection('Popular shows')
        return dispatch(setPopularTvShows(currentPage))

      case '/shows/top_rated':
        setSection('Top rated')
        return dispatch(setTopRatedTvShows(currentPage))

      default:
        setSection('Popular movies')
        return dispatch(setPopularFilmsThunk(1))
    }
  }, [location.pathname, currentPage])


  return (
    <Container sx={{ mt: '2rem', height: '100vh' }}>
      <FilmSearchField />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Typography variant='h4' sx={{ color: 'var(--color)', fontFamily: 'Roboto' }}>
          {section}
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent='center' alignItems='center' sx={{ mb: '1.5rem' }}>
        <FilmsOutput films={films} location={location} />
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant='outlined' onClick={loadMoreFilms} sx={{ mb: '1rem' }}>
          Load more
        </Button>
      </Box>
    </Container>
  )
}

export default React.memo(Films)
