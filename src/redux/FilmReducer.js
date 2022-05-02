import { filmApi } from '../api/filmApi'

const SET_FILMS = 'SET_FILMS'
const SET_FILM_ITEM = 'SET_FILM_ITEM'
const SEARCH_FILMS = 'SEARCH_FILMS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const CLEAR_FILMS = 'CLEAR_FILMS'
const SET_USER_FAV = 'SET_USER_FAV'
const SET_USER_WATCHLIST = 'SET_USER_WATCHLIST'
const SET_USER_RATING = 'SET_USER_RATING'
const CLEAR_FILM_ITEM = 'CLEAR_FILM_ITEM'
let initialState = {
  films: [],
  currentPage: 1,
  filmItem: {
    item: null,
    cast: null,
    crew: null,
    userIsFav: null,
    userWatchlist: null,
    userRating: null,
    userReview: null,
  },
  searchResult: [],
}

const FilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS: {
      return {
        ...state,
        films: action.films,
      }
    }
    case CLEAR_FILMS: {
      return {
        ...state,
        films: [],
        currentPage: 1,
      }
    }
    case CLEAR_FILM_ITEM: {
      return { ...state, filmItem: {} }
    }
    case SET_FILM_ITEM: {
      return {
        ...state,
        filmItem: {
          ...state.filmItem,
          item: action.filmItem,
          cast: action.cast,
          crew: action.crew,
        },
      }
    }
    case SEARCH_FILMS: {
      return {
        ...state,
        searchResult: action.searchResult,
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case SET_USER_FAV: {
      return {
        ...state,
        filmItem: {
          ...state.filmItem,
          userIsFav: action.userIsFav,
        },
      }
    }
    case SET_USER_RATING: {
      return {
        ...state,
        filmItem: {
          ...state.filmItem,
          userRating: action.userRating,
          userReview: action.userReview,
        },
      }
    }
    case SET_USER_WATCHLIST: {
      return {
        ...state,
        filmItem: {
          ...state.filmItem,
          userWatchlist: action.userWatchlist,
        },
      }
    }

    default:
      return state
  }
}

export const actions = {
  setFilms(films) {
    return {
      type: SET_FILMS,
      films,
    }
  },

  clearFilms() {
    return { type: CLEAR_FILMS }
  },
  clearFilmItem() {
    return { type: CLEAR_FILM_ITEM }
  },

  setFilmItem(filmItem, cast, crew) {
    return {
      type: SET_FILM_ITEM,
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

  setCurrentPage(currentPage) {
    return {
      type: SET_CURRENT_PAGE,
      currentPage,
    }
  },
  setFavs(userIsFav) {
    return {
      type: SET_USER_FAV,
      userIsFav,
    }
  },
  setRating(userRating, userReview) {
    return {
      type: SET_USER_RATING,
      userRating,
      userReview,
    }
  },

  setUserWatchList(userWatchlist) {
    return {
      type: SET_USER_WATCHLIST,
      userWatchlist,
    }
  },
}

//get popular films
export const setPopularFilmsThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(Number(currentPage)))
    let res = await filmApi.getPopularFilms(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

//get now in theares films
export const setNowInTheTheatresThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getNowInTheTheatres(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

//get top rated films
export const setTopRatedFilmsThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getTopRatedFilms(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

//get upcoming films
export const setUpcomingFilmsThunk = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getUpcomingFilms(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

//get popular tv shows
export const setPopularTvShows = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getPopularTvShows(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

//get top rated tv shows
export const setTopRatedTvShows = (currentPage) => {
  return async (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage))
    let res = await filmApi.getTopRatedTvShows(currentPage)
    dispatch(actions.setFilms(res.data.results))
  }
}

//set film item
export const setFilmItemThunk = (type, filmId) => {
  return async (dispatch, getState) => {
    let resFilm = await filmApi.getFilmItem(type, filmId)
    let resActors = await filmApi.getActorsItem(type, filmId)

    let cast = resActors.data.cast.slice(0, 6)
    let crew = resActors.data.crew.slice(0, 6)
    dispatch(actions.setFilmItem(resFilm.data, cast, crew))
  }
}

//set film item
export const removeFilmItemThunk = () => {
  return async (dispatch, getState) => {
    dispatch(actions.clearFilmItem())
  }
}



//set fav film
export const setIsFav = (userIsFav) => {
  return (dispatch) => {
    dispatch(actions.setFavs(userIsFav))
  }
}

//set watchlist
export const setIsWatchlist = (userIsWatchlist) => {
  return (dispatch) => {
    dispatch(actions.setUserWatchList(userIsWatchlist))
  }
}

//set film rating
export const setRating = (userRating, userReview) => {
  return (dispatch) => {
    dispatch(actions.setRating(userRating, userReview))
  }
}

export const searchFilmThunk = (term) => {
  return async (dispatch) => {
    let res = await filmApi.searchForFilm(term)
    dispatch(actions.setSearchResults(res.data.results))
  }
}

export default FilmReducer
