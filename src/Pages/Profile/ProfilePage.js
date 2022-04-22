import styled from '@emotion/styled'
import { Alert, Box, Button, Container, Fade, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { getFavFilmsThunk, getRatingsThunk, getWatchlistItemsThunk, setAvatarThunk, setUsernameThunk } from '../../redux/AccountReducer'
import Favorites from './components/Favorites'
import Ratings from './components/Ratings'
import WatchList from './components/WatchList'
import defaultAvatar from '../../images/defaultavatar.jpg'
import { Check, PhotoCamera } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
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
  width: 140px;
  text-align: center;
  cursor: pointer;
`

const CardBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: 1000px) {
    align-items: normal;
    justify-content: normal;
  }
`

const Avatar = styled.img`
  width: 200px;
  border-radius: 5px;

  @media (min-width: 1000px) {
    width: 300px;
  }
`
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--colorSecondary)',
  },
  '& label.Mui-focused': {
    color: 'var(--colorSecondary)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--colorSecondary)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--colorSecondary)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--colorSecondary)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--colorSecondary)',
    },
  },
})

const Profile = () => {
  const dispatch = useDispatch()
  const [section, setSection] = useState('favorites')
  const [edit, setEdit] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [name, setName] = useState()
  const user = useSelector((state) => state.accountReducer.user)
  const message = useSelector((state) => state.accountReducer.message)
  const errorCode = useSelector((state) => state.accountReducer.errorCode)
  const favs = useSelector((state) => state.accountReducer.favFilms)
  const watchlist = useSelector((state) => state.accountReducer.watchlist)
  const ratings = useSelector((state) => state.accountReducer.ratings)

  const avatarSelected = (e) => {
    dispatch(setAvatarThunk(e.target.files[0]))

    setOpenAlert(true)
    setTimeout(function () {
      setOpenAlert(false)
    }, 2000)
    //e.target.files[0]
  }

  const nameChange = () => {
    setEdit(false)
    dispatch(setUsernameThunk(name))
    setOpenAlert(true)
    setTimeout(function () {
      setOpenAlert(false)
    }, 2000)
  }
  useEffect(() => {
    if (user) {
      dispatch(getFavFilmsThunk())
      dispatch(getRatingsThunk())
      dispatch(getWatchlistItemsThunk())
      setName(user.displayName)
    } else {
      return null
    }
  }, [user])

 

  if (!favs || !ratings || !watchlist) {
    return <Loader />
  }

  return (
    <PageContainer>
      {user ? (
        <Box sx={{ mb: '3rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {edit === true ? (
              <CustomTextField
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                InputProps={{
                  style: {
                    color: 'var(--color)',
                    fontSize: 20,
                  },
                }}
              />
            ) : (
              <Typography variant='h4'>{user.displayName ? name : user.email}</Typography>
            )}
            {edit === false ? (
              <IconButton onClick={() => setEdit(true)}>
                <EditIcon sx={{ color: 'var(--color)' }} fontSize='small' />
              </IconButton>
            ) : (
              <IconButton onClick={() => nameChange()}>
                <Check sx={{ color: 'var(--color)' }} fontSize='small' />
              </IconButton>
            )}
          </Box>
          <Box sx={{ mb: '0.5rem' }}>
            <Avatar src={user.photoURL ? user.photoURL : defaultAvatar} alt='user pic' />
          </Box>
          <Button variant='contained' component='label'>
            <PhotoCamera />
            Upload
            <input type='file' hidden onChange={avatarSelected} accept='image/*' />
          </Button>
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
            <Typography variant='h5'>{watchlist.length}</Typography>
            <Typography>On watch list</Typography>
          </InfoCard>
          <InfoCard>
            <Typography variant='h5'>
              {ratings.length === 0 ? '0' : Math.floor(ratings.reduce((accumulator, curValue) => accumulator + curValue.rating, 0) / ratings.length)}
            </Typography>
            <Typography>Average rating</Typography>
          </InfoCard>
        </CardBox>
        {section === 'favorites' ? <Favorites /> : section === 'ratings' ? <Ratings /> : section === 'watchlist' ? <WatchList /> : ''}
      </Box>
      <Fade in={openAlert}>
        <Alert severity={errorCode === 1 ? 'success' : 'error'} sx={{ position: 'absolute', left: 5, bottom: 15 }}>
          {message}
        </Alert>
      </Fade>
    </PageContainer>
  )
}

export default Profile
