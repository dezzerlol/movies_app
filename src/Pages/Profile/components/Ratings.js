import styled from '@emotion/styled'
import { Box, Card, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'

const CardContainer = styled(Card)`
  margin: 0 0 1rem;
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
  width: 150px;
`

const Ratings = () => {
  const ratings = useSelector((state) => state.accountReducer.ratings)

  const ratingsOutput = ratings.map((rating) => (
    <CardContainer key={rating.id}>
      <Link to={`/movie/${ratings.id}`}>{rating.name}</Link>
      <Typography>{rating.rating}</Typography>
      <IconButton>
        <CloseIcon color='primary' />
      </IconButton>
    </CardContainer>
  ))

  return (
    <Box>
      <Typography variant='h4'>Ratings:</Typography>
      <Box sx={{display: 'flex', justifyContent: 'space-between', p: '0 2rem'}}>
        <Typography variant='caption' sx={{ color: 'var(--colorSecondary)', width: '110px' }}>
          Name
        </Typography>
        <Typography variant='caption' sx={{ color: 'var(--colorSecondary)' }}>
          Score
        </Typography>
        <Typography variant='caption' sx={{ color: 'var(--colorSecondary)' }}>
          
        </Typography>
      </Box>
      {ratingsOutput}
    </Box>
  )
}

export default Ratings
