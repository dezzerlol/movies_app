import styled from '@emotion/styled'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Button, DialogActions, Rating, Skeleton, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setRatingThunk } from '../../../redux/AccountReducer'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CustomDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    backgroundColor: 'var(--colorSecondary)',
  },
  backdropFilter: 'blur(3px)',
})

const RateButton = ({ filmItem, userRating, setUserRating, userReview }) => {
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [value, setValue] = useState(userRating)
  const params = useParams()
  const dispatch = useDispatch()
  const textRef = useRef()
  const open = Boolean(anchorEl)

  useEffect(() => {
    setValue(userRating)
  }, [userRating])

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const setRating = (newValue) => {
    setValue(newValue)
  }

  const clickHandle = () => {
    const id = params.id
    const name = filmItem.original_title ? filmItem.original_title : filmItem.original_name
    const review = textRef.current.value
    setUserRating(value)
    dispatch(setRatingThunk(id, name, value, review))
  }

  if (loggedIn === false) {
    return ''
  }
  if (userRating === null) {
    return <Skeleton width={40} height={40} />
  }

  console.log(filmItem)
  return (
    <>
      <IconButton onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={handleClickOpen}>
        {value !== false ? <StarIcon sx={{ color: 'var(--colorSecondary)' }} /> : <StarBorderIcon sx={{ color: 'var(--colorSecondary)' }} />}
      </IconButton>

      <CustomDialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>{'Set your rating for this movie'}</DialogTitle>
        <DialogContent>
          <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Rating
              name='customized-10'
              max={10}
              value={value}
              sx={{ mb: '1rem' }}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
            <TextField inputRef={textRef} multiline fullWidth rows={4} placeholder={'Write your review'} sx={{ mb: '1rem' }} />
            <Button variant='contained' onClick={clickHandle}>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </CustomDialog>

      <Popover
        id='mouse-over-popover'
        disableScrollLock={true}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography sx={{ p: 1 }}>{value !== false ? 'Change your rating' : 'Rate'}</Typography>
      </Popover>
    </>
  )
}

export default RateButton
