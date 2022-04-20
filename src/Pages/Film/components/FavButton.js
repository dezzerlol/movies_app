import { Alert, Fade, IconButton, Popover, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavThunk, removeFromFavThunk } from '../../../redux/AccountReducer'
import { useParams } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CheckIcon from '@mui/icons-material/Check'

const FavButton = ({ filmItem }) => {
  const userFav = useSelector((state) => state.filmReducer.filmItem.userIsFav)
  const dispatch = useDispatch()
  const params = useParams()
  const [anchorEl, setAnchorEl] = useState(null)
  const [fav, setFav] = useState()
  const [openAlert, setOpenAlert] = useState(false)

  useEffect(() => {
    setFav(userFav)
  }, [userFav])

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const addToFav = () => {
    const name = filmItem.original_title ? filmItem.original_title : filmItem.original_name
    const id = params.id
    dispatch(addToFavThunk(id, name))
    setOpenAlert(true)
    setFav(true)
    setTimeout(function () {
      setOpenAlert(false)
    }, 2000)
  }

  const removeFromFav = () => {
    const id = params.id
    dispatch(removeFromFavThunk(id, 'film'))
    setOpenAlert(true)
    setFav(false)
    setTimeout(function () {
      setOpenAlert(false)
    }, 2000)
  }

  if (userFav == null) {
    return <Skeleton width={40} height={40} sx={{ mr: 1 }} />
  }

  return (
    <>
      <IconButton onClick={fav === false ? addToFav : removeFromFav} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {fav === false ? <FavoriteBorderIcon sx={{ color: 'var(--colorSecondary)' }} /> : <FavoriteIcon sx={{ color: 'var(--colorSecondary)' }} />}
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
        <Typography sx={{ p: 1 }}>{fav === false ? 'Add to favorites' : 'Remove from favorites'}</Typography>
      </Popover>

      <Fade in={openAlert}>
        <Alert icon={<CheckIcon fontSize='inherit' />} severity='success' variant='filled' sx={{ position: 'absolute', left: 5, bottom: 15 }}>
          {fav === true
            ? `Added ${filmItem.original_title ? filmItem.original_title : filmItem.original_name} to your favorites`
            : `Removed ${filmItem.original_title ? filmItem.original_title : filmItem.original_name} from your favorites`}
        </Alert>
      </Fade>
    </>
  )
}

export default FavButton
