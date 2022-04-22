import styled from '@emotion/styled'
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
const CardContainer = styled(Card)`
  width: 260;
  height: 110;
  background-color: var(--container);
  color: var(--color);
`
 //crew/cast card output
 const PeopleCard = ({roleArr}) => {
    return (
      <Grid container spacing={4}>
        {roleArr.map((role) => (
          <Grid item key={role.credit_id} xs={8} md={6}>
            <CardContainer>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='h5'>{role.name}</Typography>
                  <Avatar src={`https://image.tmdb.org/t/p/original/${role.profile_path}`} sx={{ width: 60, height: 60 }} alt='actor pic' />
                </Box>
                <Box>
                  <Typography variant='caption' sx={{ color: 'var(--colorSecondary)' }}>
                    {role.character ? role.character : role.job}
                  </Typography>
                </Box>
              </CardContent>
            </CardContainer>
          </Grid>
        ))}
      </Grid>
    )
  }

  export default PeopleCard