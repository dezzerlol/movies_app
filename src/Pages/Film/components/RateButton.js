import styled from '@emotion/styled'
import GradeIcon from '@mui/icons-material/Grade'
import { Rating } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Slide from '@mui/material/Slide'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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

const RateButton = ({ filmItem }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [value, setValue] = React.useState(1)
  const params = useParams()
  const dispatch = useDispatch()
  const open = Boolean(anchorEl)

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
    const id = params.id
    const name = filmItem.original_title ? filmItem.original_title : filmItem.original_name
    setValue(newValue)
    dispatch(setRatingThunk(id, name, newValue))
  }

  return (
    <>
      <IconButton onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={handleClickOpen}>
        <GradeIcon sx={{ color: 'var(--colorSecondary)' }} />
      </IconButton>

      <CustomDialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle sx={{ textAlign: 'center' }}>{'Set your rating for this movie'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Rating
              name='customized-10'
              defaultValue={null}
              max={10}
              value={value}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
          </DialogContentText>
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
        <Typography sx={{ p: 1 }}>Rate</Typography>
      </Popover>
    </>
  )
}

export default RateButton
