import styled from '@emotion/styled'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert, Avatar, Button, Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { signInEmailThunk, signInGoogleThunk } from '../../redux/AccountReducer'
const LoginContainer = styled(Container)`
  min-height: 100vh;
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

const LoginSchema = object().shape({
  email: string().email('Email is required').required('This field is required'),
  password: string().required('This field is required'),
})

const Login = () => {
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)
  const user = useSelector((state) => state.accountReducer.user)
  const isLoading = useSelector((state) => state.accountReducer.isLoading)
  const message = useSelector((state) => state.accountReducer.message)
  const isFail = useSelector((state) => state.accountReducer.isFail)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(signInEmailThunk(values.email, values.password))
    },
  })
  const googleLoginHandle = () => {
    dispatch(signInGoogleThunk())
  }

  useEffect(() => {
    if (loggedIn) {
      navigate(`/profile/${user.uid}`, { replace: true })
    }
  }, [loggedIn])

  return (
    <LoginContainer>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography variant='h4' sx={{ color: 'var(--color)', fontFamily: 'Roboto', mb: '2rem' }}>
        Sign in
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box width={'300px'}>
          <CustomTextField
            id='email'
            label='Email'
            name='email'
            variant='outlined'
            sx={{ mb: '1rem' }}
            fullWidth
            onChange={formik.handleChange}
            helperText={formik.errors.email && formik.touched.email && `${formik.errors.email}`}
            error={formik.errors.email && formik.touched.email}
            InputLabelProps={{
              style: {
                color: 'var(--colorSecondary)',
              },
            }}
            InputProps={{
              style: {
                color: 'var(--color)',
              },
            }}
          />
          <CustomTextField
            id='password'
            label='Password'
            variant='outlined'
            type='password'
            name='password'
            onChange={formik.handleChange}
            helperText={formik.errors.password && formik.touched.password && `${formik.errors.password}`}
            error={formik.errors.password && formik.touched.password}
            sx={{ mb: '1rem' }}
            fullWidth
            InputLabelProps={{
              style: {
                color: 'var(--colorSecondary)',
              },
            }}
            InputProps={{
              style: {
                color: 'var(--color)',
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', mb: '1rem' }}>
          <Button variant='outlined' onClick={() => navigate('/signup')}>
            Sign up
          </Button>
          <Button variant='outlined' type='submit' disabled={isLoading}>
            Login
          </Button>
        </Box>
      </form>
      <Button variant='outlined' onClick={googleLoginHandle} disabled={isLoading} sx={{mb: '1rem'}}>
        Sign in with google
      </Button>
      {message && <Alert severity={isFail === false ? 'success' : 'error'}>{message}</Alert>}
    </LoginContainer>
  )
}

export default Login
