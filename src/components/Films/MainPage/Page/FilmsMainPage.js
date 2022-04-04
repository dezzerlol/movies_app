import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  setNowInTheTheatresThunk,
  setPopularFilmsThunk,
  setPopularTvShows,
  setTopRatedFilmsThunk,
  setTopRatedTvShows,
  setUpcomingFilmsThunk
} from '../../../../store/FilmReducer'
import Loader from '../../../common/Loader'
import FilmSearchField from '../../FilmSearch/FilmSearchField'
import FilmItem from '../FilmItems/FilmItem'

const Films = (props) => {
  const films = useSelector((state) => state.filmReducer.films)
  const currentPage = useSelector((state) => state.filmReducer.currentPage)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams({})
  const queryPage = searchParams.get('page')
  const [section, setSection] = useState('')
  const [page, setPage] = useState(currentPage)

  const loadMoreFilms = () => {
    setPage(page + 1)
  }

 
  useEffect(() => {
    setPage(1)
    setSearchParams({
      page: 1,
    })
  }, [section])


  useEffect(() => {
    setSearchParams({
      page: page,
    })

    switch (location.pathname) {
      case '/movies/popular':
        setSection('Popular movies')       
        return dispatch(setPopularFilmsThunk(page))

      case '/movies/in_theatres':
        setSection('In theatres')
        return dispatch(setNowInTheTheatresThunk(page))

      case '/movies/upcoming':
        setSection('Upcoming')
        return dispatch(setUpcomingFilmsThunk(page))

      case '/movies/top_rated':
        setSection('Top rated')
        return dispatch(setTopRatedFilmsThunk(page))

      case '/shows/popular':
        setSection('Popular shows')
        return dispatch(setPopularTvShows(page))

      case '/shows/top_rated':
        setSection('Top rated')
        return dispatch(setTopRatedTvShows(page))

      default:
        setSection('Popular movies')
        return dispatch(setPopularFilmsThunk(1))
    }
  }, [location.pathname, page])

  if (films.length === 0) {
    return <Loader />
  }

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
    <Container>
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
        <Button variant='outlined' onClick={loadMoreFilms}>
          Load more
        </Button>
      </Box>
    </Container>
  )
}

export default Films
