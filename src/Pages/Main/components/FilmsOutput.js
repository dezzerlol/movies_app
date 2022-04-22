import React from 'react'
import { matchPath, useNavigate } from 'react-router-dom'
import FilmItem from './FilmItem'

const FilmsOutput = ({ films, location }) => {
  const navigate = useNavigate()
  const onClickHandle = (id) => {
    let type = matchPath('/movies/*', location.pathname) ? 'movie' : 'tv'
    if (type === 'movie') {
      return navigate(`/movie/${id}`)
    } else {
      return navigate(`/show/${id}`)
    }
  }
  return films.map((film) => {
    return (
      <FilmItem
        key={film.id}
        id={film.id}
        poster={film.poster_path}
        title={film.title ? film.title : film.name}
        rating={film.vote_average}
        onClickHandle={onClickHandle}
        releaseDate={film.release_date ? film.release_date : film.first_air_date ? film.first_air_date : ''}
      />
    )
  })
}

export default FilmsOutput
