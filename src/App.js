import { Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import ScrollToTop from './components/common/ScrollToTop'
import FilmPage from './components/Films/MainPage/FilmPage'
import Films from './components/Films/MainPage/FilmsMainPage'
import SearchResult from './components/Films/SearchResults/SearchResult'
import SearchBar from './components/Header/SearchBar'
import ShowPage from './components/Shows/ShowPage'

const App = () => {
  return (
    <div className={styles.app_wrapper}>
      <div>
        <SearchBar />
      </div>
      <Routes>
        <Route path='/' element={<Navigate to='/movies/popular' />} />
        <Route path='/movies' element={<Films />}>
          <Route path='popular' element={<Films />} />
          <Route path='in_theatres' element={<Films />} />
          <Route path='upcoming' element={<Films />} />
          <Route path='top_rated' element={<Films />} />
        </Route>
        <Route path='/shows' element={<Films />}>
          <Route path='popular' element={<Films />} />
        </Route>
        <Route path='/Favorites' element={<Films />} />
        <Route path='/film/:id' element={<FilmPage />} />
        <Route path='/show/:id' element={<ShowPage />} />
        <Route path='search' element={<SearchResult />} />
      </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App
