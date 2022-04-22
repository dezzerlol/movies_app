import { Divider, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const FilmRating = ({vote_average}) => {
  return (
    <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Rating: {vote_average}
          </Typography>
          <Rating name='read-only' value={vote_average} readOnly max={10} size='large' />
          <Divider sx={{ backgroundColor: 'var(--colorSecondary2)' }} />
        </Box>
  )
}

export default FilmRating