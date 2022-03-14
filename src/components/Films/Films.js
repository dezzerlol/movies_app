import { Box, Container, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPopularFilmsThunk } from '../../store/FilmReducer'
import Loader from '../common/Loader'
import FilmItem from './FilmItem'

const Films = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const popularFilms = useSelector((state) => state.filmReducer.popularFilms)
  const [fav, setFav] = useState(false)

  const addToFavorites = (e) => {
    setFav(!fav)
  }

  const onClickHandle = (id) => {
    return navigate(`/film/${id}`)
  }

  useEffect(() => {
    dispatch(setPopularFilmsThunk())
  }, [])

  if (!popularFilms) {
    return <Loader />
  }

  const filmsOutput = popularFilms.map((film) => {
    return (
      <FilmItem
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
      <Box>
        <TextField id='outlined-basic' label='Search' variant='outlined' fullWidth sx={{ mb: '1.5rem' }} />
      </Box>
      <Grid container spacing={4} justifyContent='center' alignItems='center' sx={{ mb: '1.5rem' }}>
        {filmsOutput}
      </Grid>
    </Container>
  )
}

export default Films
