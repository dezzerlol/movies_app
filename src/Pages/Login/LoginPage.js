import styled from '@emotion/styled'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Button, Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../api/accountApi'
import { signInThunk, signOut } from '../../redux/AccountReducer'
const LoginContainer = styled(Container)`
  height: calc(100vh - 96px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
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

const Login = () => {
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandle = () => {
    dispatch(signInThunk())
  }

  const signOutHandle = () => {
    auth.signOut()
    dispatch(signOut())
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/profile')
    }
  }, [loggedIn])

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography variant='h4' sx={{ color: 'var(--color)', fontFamily: 'Roboto', mb: '2rem' }}>
        Sign up
      </Typography>

      <Box width={'300px'}>
        <CustomTextField
          id='email'
          label='Email'
          variant='outlined'
          sx={{ mb: '1rem' }}
          fullWidth
          InputLabelProps={{
            style: {
              color: 'var(--colorSecondary)',
            },
          }}
        />
        <CustomTextField
          id='password'
          label='Password'
          variant='outlined'
          sx={{ mb: '1rem' }}
          fullWidth
          InputLabelProps={{
            style: {
              color: 'var(--colorSecondary)',
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', mb: '1rem' }}>
        <Button variant='outlined'>Sign up</Button>
        <Button variant='outlined'>Login</Button>
      </Box>
      <Button variant='outlined' onClick={loginHandle}>
        Sign in with google
      </Button>
      <Button className='button signout' onClick={signOutHandle}>
        Sign out
      </Button>
    </LoginContainer>
  )
}

export default Login
