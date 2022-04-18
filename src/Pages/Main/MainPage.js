import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  actions,
  setNowInTheTheatresThunk,
  setPopularFilmsThunk,
  setPopularTvShows,
  setTopRatedFilmsThunk,
  setTopRatedTvShows,
  setUpcomingFilmsThunk
} from '../../redux/FilmReducer'
import FilmItem from './components/FilmItem'
import FilmSearchField from './components/FilmSearchField'


const Films = () => {
  const currentPage = useSelector((state) => state.filmReducer.currentPage)
  const films = useSelector((state) => state.filmReducer.films)

  const navigate = useNavigate()
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
    if(queryPage ===null){
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

  const onClickHandle = (id) => {
    let type = matchPath('/movies/*', location.pathname) ? 'movie' : 'tv'
    if (type === 'movie') {
      return navigate(`/movie/${id}`)
    } else {
      return navigate(`/show/${id}`)
    }
  }

  const filmsOutput = films.map((film) => {
    return (
      <FilmItem
        key={film.id}
        id={film.id}
        poster={film.poster_path}
        title={film.title ? film.title : film.name}
        rating={film.vote_average}
        onClickHandle={onClickHandle}
        releaseDate={film.release_date ? film.release_date : film.first_air_date ? film.first_air_date : ''}
      />
    )
  })

  return (
    <Container sx={{mt: '2rem'}}>
      <FilmSearchField />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' sx={{ color: 'var(--color)', fontFamily: 'Roboto' }}>
          {section}
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent='center' alignItems='center' sx={{ mb: '1.5rem' }}>
        {filmsOutput}
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
