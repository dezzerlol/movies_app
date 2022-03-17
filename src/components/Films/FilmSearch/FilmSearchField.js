import { Button, InputAdornment, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchFilmThunk } from '../../../store/FilmReducer'
import SearchIcon from '@mui/icons-material/Search'

const FilmSearchField = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      term: '',
    },
    onSubmit: (values) => {
      dispatch(searchFilmThunk(values.term))
      navigate('/search')
    },
    enableReinitialize: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          name='term'
          id='term'
          type='text'
          onChange={formik.handleChange}
          label='Search'
          variant='outlined'
          fullWidth
          focused
          sx={{ mb: '1.5rem', mr: 1, input: { color: 'white' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: '#F83646' }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: '#F83646' },
          }}
        />

        <Button variant='contained' sx={{ height: '55px' }} type='submit'>
          Search
        </Button>
      </Box>
    </form>
  )
}

export default FilmSearchField
