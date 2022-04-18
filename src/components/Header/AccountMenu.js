import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ThemeSwitch from './ThemeSwitch'
import LoginIcon from '@mui/icons-material/Login'
import { auth } from '../../api/accountApi'
import {signOut } from '../../redux/AccountReducer'
import { useState } from 'react'

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const loggedIn = useSelector((state) => state.accountReducer.loggedIn)
  const user = useSelector((state) => state.accountReducer.user)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOutHandle = () => {
    auth.signOut()
    dispatch(signOut())
    navigate('/')
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mr: '3rem' }}>
        <Tooltip title='Your profile'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}>
            {user ? <Avatar sx={{ width: 32, height: 32 }} src={user.photoURL}></Avatar> : <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        sx={{ position: 'absolute' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {loggedIn ? (
          <MenuItem onClick={() => navigate(`/profile/${user.uid}`)}>Profile</MenuItem>
        ) : (
          <MenuItem onClick={() => navigate('/login')}>
            <ListItemIcon>
              <LoginIcon fontSize='small' />
            </ListItemIcon>
            Sign up
          </MenuItem>
        )}

        <MenuItem onClick={signOutHandle}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
        <Divider />

        <MenuItem>
          <ThemeSwitch />
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu