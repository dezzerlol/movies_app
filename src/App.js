import { Navigate, Route, Routes } from 'react-router-dom'
import styles from './index.module.css'
import ScrollToTop from './components/common/ScrollToTop'
import FilmPage from './components/Films/Pages/Film/FilmPage'
import MainPage from './components/Films/Pages/Main/MainPage'
import SearchResult from './components/Films/FilmSearch/SearchResults/SearchResult'
import SearchBar from './components/Header/SearchBar'

import { useSelector } from 'react-redux'

const App = () => {
  const darkMode = useSelector((state) => state.filmReducer.darkMode)

  return (
    <div className={styles.app_wrapper} data-theme={darkMode ? 'dark' : 'light'}>
      <div>
        <SearchBar />
      </div>
      <Routes>
        <Route path='/' element={<Navigate to='/movies/popular' />} />

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
        <Route path='*' element={<div>404 page not found</div>} />
      </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App
