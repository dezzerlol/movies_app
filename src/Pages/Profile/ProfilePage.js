import styled from '@emotion/styled'
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { getFavFilmsThunk, getRatingsThunk } from '../../redux/AccountReducer'
import Favorites from './components/Favorites'
import Ratings from './components/Ratings'
import WatchList from './components/WatchList'
import defaultAvatar from '../../images/defaultavatar.jpg'

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
  width: 110px;
  text-align: center;
  cursor: pointer;
`

const CardBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Avatar = styled.img`
  margin-bottom: 3rem;
  width: 200px;

  @media (min-width: 1000px) {
    width: 300px;
  }
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
          <Typography variant='h4'>{user.displayName ? user.displayName : user.email}</Typography>
          <Box>
            <Avatar src={user.photoURL ? user.photoURL : defaultAvatar} alt='user pic' />
          </Box>
        </Box>
      ) : (
        ''
      )}

      <Box>
        <CardBox>
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
            <Typography variant='h5'>
              {ratings.length === 0 ? '0' : Math.floor(ratings.reduce((accumulator, curValue) => accumulator + curValue.rating, 0) / ratings.length)}
            </Typography>
            <Typography>Average rating</Typography>
          </InfoCard>
        </CardBox>
        {section === 'favorites' ? <Favorites /> : section === 'ratings' ? <Ratings /> : section === 'watchlist' ? <WatchList /> : ''}
      </Box>
    </PageContainer>
  )
}

export default Profile
