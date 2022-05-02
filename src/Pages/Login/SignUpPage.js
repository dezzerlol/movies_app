import styled from '@emotion/styled'
import { Alert, Avatar, Box, Button, Container, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUpEmailThunk } from '../../redux/AccountReducer'
import { object, ref, string } from 'yup'


const SignupContainer = styled(Container)`
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

const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--colorSecondary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const LoginSchema = object().shape({
  email: string().email('Email is required').required('This field is required'),
  password: string().required('This field is required'),
  confirmPassword: string()
    .required()
    .oneOf([ref('password')], 'Your passwords do not match.'),
})

const SignUpPage = () => {
  const message = useSelector((state) => state.accountReducer.message)
  const isFail = useSelector((state) => state.accountReducer.isFail)
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)
  const user = useSelector((state) => state.accountReducer.user)
  const isLoading = useSelector((state) => state.accountReducer.isLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(signUpEmailThunk(values.email, values.password))
    },
  })
  useEffect(() => {
    if (loggedIn) {
      navigate(`/profile/${user.uid}`, { replace: true })
    }
  }, [])


  return (
    <SignupContainer>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <PersonAddAlt1Icon />
      </Avatar>
      <Typography variant='h4' sx={{ color: 'var(--color)', fontFamily: 'Roboto', mb: '2rem' }}>
        Sign up
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box width={'300px'}>
          <CustomTextField
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            onBlur={formik.handleChange}
            variant='outlined'
            helperText={formik.errors.email && formik.touched.email && `${formik.errors.email}`}
            error={formik.errors.email && formik.touched.email}
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
          <CustomTextField
            id='password'
            label='Password'
            name='password'
            onBlur={formik.handleChange}
            variant='outlined'
            type='password'
            sx={{ mb: '1rem' }}
            fullWidth
            helperText={formik.errors.password && formik.touched.password && `${formik.errors.password}`}
            error={formik.errors.password && formik.touched.password}
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
            id='confirmPassword'
            label='Confirm password'
            name='confirmPassword'
            type='password'
            onBlur={formik.handleChange}
            variant='outlined'
            helperText={formik.errors.confirmPassword && formik.touched.confirmPassword && `${formik.errors.confirmPassword}`}
            error={formik.errors.confirmPassword && formik.touched.confirmPassword}
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
        <Button variant='outlined' type='submit' disabled={isLoading}>
          Sign up
        </Button>
        <Typography variant='caption' sx={{ color: 'var(--color)', fontFamily: 'Roboto', mt: '1rem' }}>
          Already have an account? <Link to='/login'>Sign-In</Link>
        </Typography>
        {message && <Alert severity={isFail === false ? 'success' : 'error'}>{message}</Alert>}
      </form>
    </SignupContainer>
  )
}

export default SignUpPage
