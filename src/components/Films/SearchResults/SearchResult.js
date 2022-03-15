import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilmItem from '../FilmItem'
import Loader from '../../common/Loader'
import { setFilmItemThunk } from '../../../store/FilmReducer'
import { useNavigate } from 'react-router-dom'

const SearchResult = () => {
  const searchResult = useSelector((state) => state.filmReducer.searchResult)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (!searchResult) {
    return <Loader />
  }

  const onClickHandle = (id) => {
    dispatch(setFilmItemThunk(id))
    return navigate(`/film/${id}`)
  }

  const filmsOutput = searchResult.map((film) => {
    return <FilmItem key={film.id} id={film.id} poster={film.poster_path} title={film.title} rating={film.vote_average} onClickHandle={onClickHandle} />
  })

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' sx={{ color: 'white', fontFamily: 'Roboto' }}>
          Search result
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent='center' alignItems='center' sx={{ mb: '1.5rem' }}>
        {filmsOutput}
      </Grid>
    </Container>
  )
}

export default SearchResult
