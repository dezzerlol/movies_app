import styled from '@emotion/styled'
import { Box, Card, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'

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

const Ratings = () => {
  const ratings = useSelector((state) => state.accountReducer.ratings)

  const ratingsOutput = ratings.map((rating) => (
    <CardContainer key={rating.id}>
      <Link to={'/'}>{rating.name}</Link>
      <Typography>{rating.rating}</Typography>
      <IconButton>
        <CloseIcon color='primary' />
      </IconButton>
    </CardContainer>
  ))

  return (
    <Box>
      <Typography variant='h4'>Your ratings:</Typography>
      {ratingsOutput}
    </Box>
  )
}

export default Ratings
