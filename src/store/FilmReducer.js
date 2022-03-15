import { filmApi } from '../api/filmApi'
const GET_POPULAR_FILMS = 'GET_POPULAR_FILMS'
const GET_FILM_ITEM = 'GET_FILM_ITEM'
const SEARCH_FILMS = 'SEARCH_FILMS'

let initialState = {
  popularFilms: null,
  filmItem: null,
  searchResult: null,
}

const FilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_FILMS:
      return {
        ...state,
        popularFilms: action.popularFilms,
      }
    case GET_FILM_ITEM:
      return {
        ...state,
        filmItem: action.filmItem,
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
  setPopularFilms(popularFilms) {
    return {
      type: GET_POPULAR_FILMS,
      popularFilms,
    }
  },
  setFilmItem(filmItem) {
    return {
      type: GET_FILM_ITEM,
      filmItem,
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
    dispatch(actions.setPopularFilms(res.data.results))
  }
}

export const setFilmItemThunk = (filmId) => {
  return async (dispatch) => {
    let res = await filmApi.getFilmItem(filmId)
    dispatch(actions.setFilmItem(res.data))
  }
}

export const searchFilmThunk = (term) => {
  return async (dispatch) => {
    let res = await filmApi.searchForFilm(term)
    dispatch(actions.setSearchResults(res.data.results))
  }
}

export default FilmReducer
