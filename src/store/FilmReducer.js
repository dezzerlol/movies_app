import { filmApi } from '../api/filmApi'

const GET_FILMS = 'GET_FILMS'
const GET_FILM_ITEM = 'GET_FILM_ITEM'
const SEARCH_FILMS = 'SEARCH_FILMS'
const SET_DARK_MODE = 'SET_DARK_MODE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const CLEAR_FILMS = 'CLEAR_FILMS'

let initialState = {
  films: [],
  currentPage: 1,
  filmItem: {
    item: null,
    cast: null,
    crew: null,
  },
  searchResult: [],
  darkMode: JSON.parse(localStorage.getItem('darkMode')),
}

const FilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILMS:
      return {
        ...state,
        films: action.films,
      }

    case CLEAR_FILMS:
      return {
        ...state,
        films: [],
        currentPage: 1,
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }

    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.darkMode,
      }

    default:
      return state
  }
}

export const actions = {
  setFilms(films) {
    return {
      type: GET_FILMS,
      films,
    }
  },

  clearFilms() {
    return { type: CLEAR_FILMS }
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

  setDarkMode(darkMode) {
    return {
      type: SET_DARK_MODE,
      darkMode,
    }
  },

  setCurrentPage(currentPage) {
    return {
      type: SET_CURRENT_PAGE,
      currentPage,
    }
  },
}

export const setPopularFilmsThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(Number(currentPage)))
    let res = await filmApi.getPopularFilms(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setNowInTheTheatresThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getNowInTheTheatres(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setTopRatedFilmsThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getTopRatedFilms(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setUpcomingFilmsThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getUpcomingFilms(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setPopularTvShows = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getPopularTvShows(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

export const setTopRatedTvShows = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getTopRatedTvShows(currentPage)
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

export const setDarkModeThunk = (darkMode) => {
  return async (dispatch) => {
    dispatch(actions.setDarkMode(darkMode))
    localStorage.setItem('darkMode', darkMode)
  }
}

export default FilmReducer
