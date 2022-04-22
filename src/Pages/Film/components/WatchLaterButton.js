import AddToQueueIcon from '@mui/icons-material/AddToQueue'
import CheckIcon from '@mui/icons-material/Check'
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue'
import { Alert, Fade, IconButton, Popover, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWatchlistThunk, removeFromWatchlistThunk } from '../../../redux/AccountReducer'

const WatchLaterButton = ({ filmItem }) => {
  const watchlist = useSelector((state) => state.filmReducer.filmItem.userWatchlist)
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)
  const dispatch = useDispatch()
  const params = useParams()
  const [anchorEl, setAnchorEl] = useState(null)
  const [userWatchlist, setUserWatchlist] = useState()
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    setUserWatchlist(watchlist)
  }, [watchlist])

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const addToWatchlist = () => {
    const name = filmItem.original_title ? filmItem.original_title : filmItem.original_name
    const id = params.id
    dispatch(addToWatchlistThunk(id, name))
    setOpenAlert(true)
    setUserWatchlist(true)
    setTimeout(function () {
      setOpenAlert(false)
    }, 2000)
  }

  const removeFromWatchlist = () => {
    const id = params.id
    dispatch(removeFromWatchlistThunk(id, 'film'))
    setOpenAlert(true)
    setUserWatchlist(false)
    setTimeout(function () {
      setOpenAlert(false)
    }, 2000)
  }
  if (loggedIn === false) {
    return ''
  }

  if (watchlist == null) {
    return <Skeleton width={40} height={40} sx={{ mr: 1 }} />
  }

  return (
    <>
      <IconButton onClick={userWatchlist === false ? addToWatchlist : removeFromWatchlist} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {userWatchlist === false ? <AddToQueueIcon sx={{ color: 'var(--colorSecondary)' }} /> : <RemoveFromQueueIcon sx={{ color: 'var(--colorSecondary)' }} />}
      </IconButton>
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
        <Typography sx={{ p: 1 }}>{userWatchlist === false ? 'Add to watch later list' : 'Remove from watch later list'}</Typography>
      </Popover>

      <Fade in={openAlert}>
        <Alert icon={<CheckIcon fontSize='inherit' />} severity='success' variant='filled' sx={{ position: 'absolute', left: 5, bottom: 15 }}>
          {userWatchlist === true
            ? `Added ${filmItem.original_title ? filmItem.original_title : filmItem.original_name} to your watch later list`
            : `Removed ${filmItem.original_title ? filmItem.original_title : filmItem.original_name} from your watch later list`}
        </Alert>
      </Fade>
    </>
  )
}

export default WatchLaterButton
