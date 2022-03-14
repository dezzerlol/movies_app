import { Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import ScrollToTop from './components/common/ScrollToTop'
import FilmPage from './components/Films/FilmPage'
import Films from './components/Films/Films'
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
      </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App
