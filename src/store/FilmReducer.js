import { filmApi } from '../api/filmApi'
const GET_FILMS = 'GET_FILMS'
const GET_FILM_ITEM = 'GET_FILM_ITEM'
const SEARCH_FILMS = 'SEARCH_FILMS'

let initialState = {
  films: null,
  filmItem: {
    item: null,
    cast: null,
    crew: null,
  },
  searchResult: [],
}

const FilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILMS:
      return {
        ...state,
        films: action.films,
      }
    case GET_FILM_ITEM:
      return {
        ...state,
        filmItem: {
          item: action.filmItem,
          cast: action.cast,
          crew: action.crew,
        },
      }
    case SEARCH_FILMS:
      return {
        ...state,
        searchResult: action.searchResult,
      }

    default:
      return state
  }
}

const actions = {
  setFilms(films) {
    return {
      type: GET_FILMS,
      films,
    }
  },
  setFilmItem(filmItem, cast, crew) {
    return {
      type: GET_FILM_ITEM,
      filmItem,
      cast,
      crew,
    }
  },
  setSearchResults(searchResult) {
    return {
      type: SEARCH_FILMS,
      searchResult,
    }
  },
}

export const setPopularFilmsThunk = () => {
  return async (dispatch) => {
    let res = await filmApi.getPopularFilms()
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setTopRatedFilmsThunk = () => {
  return async (dispatch) => {
    let res = await filmApi.getTopRatedFilms()
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setNowInTheTheatresThunk = () => {
  return async (dispatch) => {
    let res = await filmApi.getNowInTheTheatres()
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setUpcomingFilmsThunk = () => {
  return async (dispatch) => {
    let res = await filmApi.getUpcomingFilms()
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setPopularTvShows = () => {
  return async (dispatch) => {
    let res = await filmApi.getPopularTvShows()
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setFilmItemThunk = (type, filmId) => {
  return async (dispatch) => {
    let resFilm = await filmApi.getFilmItem(type, filmId)
    let resActors = await filmApi.getActorsItem(type, filmId)
    let cast = resActors.data.cast.slice(0, 6)
    let crew = resActors.data.crew.slice(0, 6)
    dispatch(actions.setFilmItem(resFilm.data, cast, crew))
  }
}

export const searchFilmThunk = (term) => {
  return async (dispatch) => {
    let res = await filmApi.searchForFilm(term)
    dispatch(actions.setSearchResults(res.data.results))
  }
}

export default FilmReducer
