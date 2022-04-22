import { Navigate, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import styles from './index.module.css'
import ScrollToTop from './components/common/ScrollToTop'
import FilmPage from './Pages/Film/FilmPage'
import MainPage from './Pages/Main/MainPage'
import Header from './components/Header/Header'
import LoginPage from './Pages/Login/LoginPage'
import Profile from './Pages/Profile/ProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { signIn } from './redux/AccountReducer'
import firebase from '../src/api/accountApi'
import SearchResult from './Pages/Main/components/SearchResult'
import Loader from './components/common/Loader'
import SignUpPage from './Pages/Login/SignUpPage'
//const MainPage = React.lazy(() => import('./Pages/Main/MainPage'))
const App = () => {
  const darkMode = useSelector((state) => state.accountReducer.darkMode)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn(user))
      }
    })
  }, [])

  return (
    <div className={styles.app_wrapper} data-theme={darkMode ? 'dark' : 'light'}>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Navigate to='/movies/popular' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/movies'>
          <Route path='popular' element={<MainPage />} />
          <Route path='in_theatres' element={<MainPage />} />
          <Route path='upcoming' element={<MainPage />} />
          <Route path='top_rated' element={<MainPage />} />
        </Route>

        <Route path='/shows'>
          <Route path='popular' element={<MainPage />} />
          <Route path='top_rated' element={<MainPage />} />
        </Route>

        <Route path='/Favorites' element={<div>to be added...</div>} />
        <Route path='/movie/:id' element={<FilmPage />} />
        <Route path='/show/:id' element={<FilmPage />} />
        <Route path='search' element={<SearchResult />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='*' element={<div>404 page not found</div>} />
      </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App
