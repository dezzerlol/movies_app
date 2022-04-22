import styled from '@emotion/styled'
import { Box, Card, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'
import { removeFromWatchlistThunk } from '../../../redux/AccountReducer'

const CardContainer = styled(Card)`
  margin: 1rem 0 1rem;
  background-color: var(--container);
  color: var(--color);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--color);
  cursor: pointer;
`

const WatchList = () => {
  const dispatch = useDispatch()
  const userWatchlist = useSelector((state) => state.accountReducer.watchlist)
  const removeFromWatchlist= (id) => {
    dispatch(removeFromWatchlistThunk(id, 'profile'))
  }
  const favFilmsOutput = userWatchlist.map((film) => (
    <CardContainer key={film.id}>
      <Link to={`/movie/${film.id}`}>{film.name}</Link>
      <IconButton onClick={() => removeFromWatchlist(film.id)}>
        <CloseIcon color='primary' />
      </IconButton>
    </CardContainer>
  ))

  return (
    <Box>
      <Typography variant='h4'>Your watch later list:</Typography>
      {favFilmsOutput.length === 0 ? (
        <Typography variant='h6' color={'var(--colorSecondary)'}>
          You havent added films to your watch list list yet.
        </Typography>
      ) : (
        favFilmsOutput
      )}
    </Box>
  )
}

export default WatchList
