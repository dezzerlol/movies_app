import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ProductionCard = ({ companies, budget }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography component='legend' variant='h6'>
        Production:
      </Typography>
      {budget !== 0 ? (
        <Box sx={{ mb: 2 }}>
          <Typography component='legend' variant='body2'>
            <b>Budget:</b> {budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
          </Typography>
          <Typography component='legend' variant='body2'>
            <b>Revenue:</b> {budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}$
          </Typography>
        </Box>
      ) : (
        ''
      )}
      <Grid container spacing={1}>
        {companies.map((company) => (
          <Grid item key={company.name}>
            <Card sx={{ mb: 2, width: 300, height: 130, backgroundColor: 'var(--container)', color: 'var(--color)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ mb: 1 }}>
                  <Typography component='h6' variant='h6'>
                    {company.name}
                  </Typography>
                </Box>
                <Box>
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                      style={{ maxWidth: '100px', maxHeight: '70px', objectFit: 'cover', height: 'auto', width: 'auto' }}
                      alt='company logo'
                    />
                  ) : null}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductionCard
