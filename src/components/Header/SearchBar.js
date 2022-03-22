import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import MovieIcon from '@mui/icons-material/Movie'
import ListItemText from '@mui/material/ListItemText'
import ThemeSwitch from './ThemeSwitch'
import { NavLink } from 'react-router-dom'
import styles from './SearchBar.module.css'
import LiveTvIcon from '@mui/icons-material/LiveTv'

const drawerWidth = 220

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position='absolute' open={open}>
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ width: '70px' }}>
              <NavLink to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant='h6' component='div'>
                  Movies
                </Typography>
              </NavLink>
            </Box>
          </Box>
          <ThemeSwitch /> {/* theme switcher */}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: 'white',
            backgroundColor: '#1A1C20',
          },
        }}
        anchor='left'
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: 'white' }} /> : <ChevronRightIcon />}</IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: 'white' }} />
        <List className={styles.nav}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MovieIcon sx={{ mr: 1 }} />
            <Typography variant='h5'>Movies</Typography>
          </Box>

          <NavLink to={`/movies/popular`} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'Popular'} />
            </ListItem>
          </NavLink>
          <NavLink to={`/movies/in_theatres`} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'In theatres'} />
            </ListItem>
          </NavLink>
          <NavLink to={`/movies/upcoming`} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'Upcoming'} />
            </ListItem>
          </NavLink>
          <NavLink to={`/movies/top_rated`} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'Top rated'} />
            </ListItem>
          </NavLink>

          <NavLink to={`/Favorites`} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'Favorites'} />
            </ListItem>
          </NavLink>
        </List>

        <Divider sx={{ backgroundColor: 'white' }} />
        <List className={styles.nav}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LiveTvIcon sx={{ mr: 1 }} />
            <Typography variant='h5'>TV shows</Typography>
          </Box>

          <NavLink to={'/shows/popular'} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'Popular'} />
            </ListItem>
          </NavLink>

          <NavLink to={'/shows/top_rated'} className={(navData) => (navData.isActive ? styles.active : styles.itemLink)}>
            <ListItem button className={styles.item}>
              <ListItemText primary={'Top rated'} />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  )
}
