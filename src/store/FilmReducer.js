import { filmApi } from '../api/filmApi'
const GET_POPULAR_FILMS = 'GET_POPULAR_FILMS'

let initialState = {
  popularFilms: null,
}

const FilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_FILMS:
      return {
        ...state,
        popularFilms: action.popularFilms,
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
}

export const setPopularFilmsThunk = () => {
  return async (dispatch) => {
    let res = await filmApi.getPopularFilms()
    dispatch(actions.setPopularFilms(res.data.results))
  }
}

export default FilmReducer
