import styled from '@emotion/styled'
import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'
import { removeRatingThunk } from '../../../redux/AccountReducer'

const CardContainer = styled(Card)`
  margin: 0 0 1rem;
  background-color: var(--container);
  color: var(--color);
`

const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--color);
  cursor: pointer;
  width: 150px;
  font-family: 'Roboto';
`

const Ratings = () => {
  const dispatch = useDispatch()
  const ratings = useSelector((state) => state.accountReducer.ratings)

  const removeRating = (id) => {
    dispatch(removeRatingThunk(id, 'profile'))
  }

  const ratingsOutput = ratings.map((rating) => (
    <CardContainer key={rating.id}>
      <CardContent sx={{ p: '0.5rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={`/movie/${rating.id}`}>{rating.name}</Link>
          <Typography variant='h6' sx={{ fontFamily: 'Roboto' }}>
            {rating.rating}
          </Typography>
          <IconButton onClick={() => removeRating(rating.id)}>
            <CloseIcon color='primary' />
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: 'var(--colorSecondary)' }} />
        <Box>
          <Typography variant='subtitle2' color={'var(--colorSecondary)'}>
            Review: {rating.review ? rating.review : '-'}
          </Typography>
        </Box>
      </CardContent>
    </CardContainer>
  ))

  return (
    <Box>
      <Typography variant='h4'>Ratings:</Typography>
      {ratingsOutput.length === 0 ? (
        <Typography variant='h6' color={'var(--colorSecondary)'}>
          You havent rated films yet.
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '0 2rem' }}>
            <Typography variant='caption' sx={{ color: 'var(--colorSecondary)', width: '110px' }}>
              Name
            </Typography>
            <Typography variant='caption' sx={{ color: 'var(--colorSecondary)' }}>
              Score
            </Typography>
            <Typography variant='caption' sx={{ color: 'var(--colorSecondary)' }}></Typography>
          </Box>
          {ratingsOutput}
        </>
      )}
    </Box>
  )
}

export default Ratings
