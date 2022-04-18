import { auth } from '../api/accountApi'
import firebase from '../api/accountApi'

const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const SET_FAVS = 'SET_FAVS'
const SET_RATINGS ='SET_RATINGS'

let initialState = {
  user: null,
  loggedIn: false,
  favFilms: null,
  ratings: null,
  watchlist: null,
}

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      }
    }

    case SIGN_OUT: {
      return {
        ...state,
        user: null,
        loggedIn: false,
      }
    }

    case SET_FAVS: {
      return {
        ...state,
        favFilms: action.favs,
      }
    }

    case SET_RATINGS:{
      return {
        ...state,
        ratings: action.ratings,
      }
    }

    default: {
      return state
    }
  }
}

export const actions = {
  signIn(user) {
    return {
      type: SIGN_IN,
      user,
    }
  },

  signOut() {
    return {
      type: SIGN_OUT,
    }
  },

  setFavs(favs) {
    return {
      type: SET_FAVS,
      favs,
    }
  },

  setRatings(ratings){
    return{
      type: SET_RATINGS,
      ratings
    }
  }
}

//saving login data in store
export const signIn = (user) => {
  return async (dispatch) => {
    dispatch(actions.signIn(user))
  }
}

//removing login data from store
export const signOut = () => {
  return async (dispatch) => {
    dispatch(actions.signOut())
  }
}

//logging into account
export const signInThunk = (account) => {
  return async (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const { user } = await auth.signInWithPopup(provider)
    dispatch(actions.signIn(user))
  }
}

//getting all fav films for account
export const getFavFilmsThunk = () => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const favs = await firebase.firestore().collection('accounts').doc(uid).collection('favs').get()
    const docs = []
    favs.forEach((doc) =>{
      docs.push(doc.data());
    })
    dispatch(actions.setFavs(docs))
  }
}

//find fav films from user
export const findFavFilmThunk = (id) => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const favs = await firebase.firestore().collection('accounts').doc(uid).collection('favs').get()
  }
}

//getting all ratings for account
export const getRatingsThunk = () => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const ratings = await firebase.firestore().collection('accounts').doc(uid).collection('ratings').get()
    const docs = []
    ratings.forEach((rating) =>{
      docs.push(rating.data());
    })
    dispatch(actions.setRatings(docs))
  }
}


//add film into fav
export const addToFavThunk = (filmId, name) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid
    console.log(loggedIn)
    const favFilm = {
      id: filmId,
      name: name,
    }
    if (loggedIn) {
      firebase.firestore().collection('accounts').doc(uid).collection('favs').doc(filmId).set(favFilm)
    } 
  }
}

//set film rating
export const setRatingThunk = (filmId, name, rating) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid
    console.log(loggedIn)
    const favFilm = {
      id: filmId,
      name: name,
      rating: rating,
    }
    if (loggedIn) {
      firebase.firestore().collection('accounts').doc(uid).collection('ratings').doc(filmId).set(favFilm)
    } 
  }
}




export default AccountReducer
