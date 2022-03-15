import { Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import ScrollToTop from './components/common/ScrollToTop'
import FilmPage from './components/Films/MainPage/FilmPage'
import Films from './components/Films/MainPage/FilmsMainPage'
import SearchResult from './components/Films/SearchResults/SearchResult'
import SearchBar from './components/SearchBar/SearchBar'

const App = () => {
  return (
    <div className={styles.app_wrapper}>
      <div>
        <SearchBar />
      </div>
      <Routes>
        <Route path='/' element={<Navigate to='/toprated/' />} />
        <Route path='/toprated' element={<Films />} />
        <Route path='/film/:id' element={<FilmPage />} />
        <Route path='search' element={<SearchResult />} />
      </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App
