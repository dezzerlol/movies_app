import { Avatar, Card, CardContent, Chip, Container, Divider, Grid, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const FilmPage = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Box sx={{ width: 400, height: 500, border: '1px dashed  black' }}>img</Box>

      <Box sx={{ width: 600, height: 900, border: '1px dashed  black', mb: 10 }}>
        <Typography variant='h4' >
          Film name
        </Typography>
        <Divider />
        
        <Box sx={{ mt: 6 }}>
          <Chip label='Action' sx={{ mr: 1 }} />
          <Chip label='Horror' sx={{ mr: 1 }} />
          <Chip label='Sci fi' sx={{ mr: 1 }} />
        </Box>
        <Typography variant='h6'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate incidunt, itaque doloremque corrupti nemo deserunt magnam esse officia possimus
          molestiae aliquam vero delectus dolorum in doloribus tempora ullam quas ratione! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          incidunt, itaque doloremque corrupti nemo deserunt magnam esse officia possimus molestiae aliquam vero delectus dolorum in doloribus tempora ullam
          quas ratione!
        </Typography>
        
        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Rating: 7.8
          </Typography>
          <Rating name='read-only' value={3} readOnly max={10} size='large' />
        </Box>
        <Divider />
        <Box sx={{ mt: 6 }}>
          <Typography component='legend' variant='h5'>
            Cast:
          </Typography>

          <Grid container spacing={4}>
            <Grid item>
              <Card sx={{ width: 260, height: 110 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '30px' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption' sx={{ color: '#C7C7C7' }}>
                    as: Actor role
                  </Typography>
                  <Typography variant='body2'>
                    <b>Birth date:</b> 00-00-1900
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ width: 260, height: 100 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption'>as: Actor role</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ width: 260, height: 100 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption'>as: Actor role</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ width: 260, height: 100 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5'>Actor Name</Typography>
                    <Avatar></Avatar>
                  </Box>
                  <Typography variant='caption'>as: Actor role</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default FilmPage
