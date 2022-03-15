import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFilmItemThunk, setPopularFilmsThunk } from '../../../store/FilmReducer'
import Loader from '../../common/Loader'
import FilmItem from '../FilmItem'
import FilmSearchField from '../FilmSearch/FilmSearchField'

const Films = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const popularFilms = useSelector((state) => state.filmReducer.popularFilms, shallowEqual)
  const [fav, setFav] = useState(false)

  const addToFavorites = (e) => {
    setFav(!fav)
  }

  const onClickHandle = (id) => {
    dispatch(setFilmItemThunk(id))
    return navigate(`/film/${id}`)
  }

  useEffect(() => {
    if (popularFilms === null) {
      dispatch(setPopularFilmsThunk())
    }
  }, [])

  if (!popularFilms) {
    return <Loader />
  }

  const filmsOutput = popularFilms.map((film) => {
    return (
      <FilmItem
        key={film.id}
        id={film.id}
        poster={film.poster_path}
        title={film.title}
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
          Popular now
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent='center' alignItems='center' sx={{ mb: '1.5rem' }}>
        {filmsOutput}
      </Grid>
    </Container>
  )
}

export default Films
