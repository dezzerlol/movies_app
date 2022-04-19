import { IconButton, Popover, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavThunk } from '../../../redux/AccountReducer'
import { useParams } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const FavButton = ({ filmItem, setOpenAlert }) => {
  const userFav = useSelector((state) => state.filmReducer.filmItem.userIsFav)
  const dispatch = useDispatch()
  const params = useParams()
  const [anchorEl, setAnchorEl] = useState(null)
  const [fav, setFav] = useState()

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

  if(userFav == null){
    return ''
  }
 
  
  return (
    <>
      <IconButton onClick={addToFav} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
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
        <Typography sx={{ p: 1 }}>{fav === false ? "Add to favorites" : "Remove from favorites"}</Typography>
      </Popover>
    </>
  )
}

export default FavButton
