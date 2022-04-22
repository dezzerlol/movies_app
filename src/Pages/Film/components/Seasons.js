import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Seasons = ({seasons}) => {
  return (
 
        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h6'>
            Seasons:
          </Typography>
          <Grid container spacing={1}>
            {seasons.map((season) => (
              <Grid item key={season.name}>
                <Card sx={{ mb: 2, width: 300, backgroundColor: 'var(--container)', color: 'var(--color)' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant='h6'>{season.name}</Typography>
                      </Box>
                      <Box sx={{ mb: 1, color: 'var(--colorSecondary)' }}>
                        <Typography variant='body2'>Out: {season.air_date}</Typography>
                      </Box>
                      <Box sx={{ mb: 1, color: 'var(--colorSecondary)' }}>
                        <Typography variant='body2'>Episodes: {season.episode_count}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      {season.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/original/${season.poster_path}`} style={{ width: '120px' }} alt='company logo' />
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
  


export default Seasons