import styled from '@emotion/styled'
import { Box, Container, getCardActionAreaUtilityClass, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { getFavFilmsThunk, getRatingsThunk } from '../../redux/AccountReducer'
import Favorites from './components/Favorites'
import Ratings from './components/Ratings'
import WatchList from './components/WatchList'

const PageContainer = styled(Container)`
  display: flex;
  color: var(--color);
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 2rem;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const InfoCard = styled(Box)`
  background-color: var(--container);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  padding: 1rem;
  border-radius: 10px;
  min-width: 100px;
  cursor: pointer;
`

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.accountReducer.user)
  const favs = useSelector((state) => state.accountReducer.favFilms)
  const ratings = useSelector((state) => state.accountReducer.ratings)
  const [section, setSection] = useState('favorites')

  useEffect(() => {
    if (user) {
      dispatch(getFavFilmsThunk())
      dispatch(getRatingsThunk())
    } else {
      return null
    }
  }, [user])

  if (!favs || !ratings) {
    return <Loader />
  }

  return (
    <PageContainer>
      {user ? (
        <Box>
          <Typography variant='h4'>{user.displayName}</Typography>
          <Box>
            <img src={user.photoURL} alt='user pic' style={{ marginBottom: '3rem', width: '300px' }} />
          </Box>
        </Box>
      ) : (
        ''
      )}

      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mb: '3rem' }}>
          <InfoCard onClick={() => setSection('favorites')}>
            <Typography variant='h5'>{favs.length}</Typography>
            <Typography>Favorites</Typography>
          </InfoCard>
          <InfoCard onClick={() => setSection('ratings')}>
            <Typography variant='h5'>{ratings.length}</Typography>
            <Typography>Ratings</Typography>
          </InfoCard>
          <InfoCard onClick={() => setSection('watchlist')}>
            <Typography variant='h5'>0</Typography>
            <Typography>On watch list</Typography>
          </InfoCard>
          <InfoCard onClick={() => setSection('avgrating')}>
            <Typography variant='h5'>{Math.floor(ratings.reduce((accumulator, curValue) => accumulator + curValue.rating, 0) / ratings.length)}</Typography>
            <Typography>Average rating</Typography>
          </InfoCard>
        </Box>
        {section === 'favorites' ? <Favorites /> : section === 'ratings' ? <Ratings /> : section === 'watchlist' ? <WatchList /> : ''}
      </Box>
    </PageContainer>
  )
}

export default Profile
