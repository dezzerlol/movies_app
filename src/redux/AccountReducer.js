import { auth } from '../api/accountApi'
import firebase from '../api/accountApi'
import { setIsFav, setIsWatchlist, setRating } from './FilmReducer'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const SET_LOADING = 'SET_LOADING'
const REGISTER_FAIL = 'REGISTER_FAIL'
const SET_MESSAGE = 'SET_MESSAGE'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
const SET_FAVS = 'SET_FAVS'
const SET_RATINGS = 'SET_RATINGS'
const SET_WATCHLIST = 'SET_WATCHLIST'
const SET_DARK_MODE = 'SET_DARK_MODE'

let initialState = {
  user: null,
  loggedIn: false,
  isLoading: false,
  favFilms: null,
  ratings: null,
  watchlist: null,
  darkMode: JSON.parse(localStorage.getItem('darkMode')),
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
        favFilms: null,
        ratings: null,
        watchlist: null,
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: action.message,
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: '',
      }
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        isFail: action.isFail
      }
    }
    case SET_FAVS: {
      return {
        ...state,
        favFilms: action.favs,
      }
    }
    case SET_WATCHLIST: {
      return {
        ...state,
        watchlist: action.watchlist,
      }
    }
    case SET_RATINGS: {
      return {
        ...state,
        ratings: action.ratings,
      }
    }
    case SET_DARK_MODE: {
      return {
        ...state,
        darkMode: action.darkMode,
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
  setLoading(isLoading) {
    return {
      type: SET_LOADING,
      isLoading,
    }
  },
  setSignupFail(isFail) {
    return {
      type: REGISTER_FAIL,
      isFail
    }
  },
  setMessage(message) {
    return {
      type: SET_MESSAGE,
      message,
    }
  },
  clearMessage() {
    return {
      type: CLEAR_MESSAGE,
    }
  },

  setFavs(favs) {
    return {
      type: SET_FAVS,
      favs,
    }
  },
  setRatings(ratings) {
    return {
      type: SET_RATINGS,
      ratings,
    }
  },
  setWatchlist(watchlist) {
    return {
      type: SET_WATCHLIST,
      watchlist,
    }
  },

  setDarkMode(darkMode) {
    return {
      type: SET_DARK_MODE,
      darkMode,
    }
  },
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
    await auth.signOut()
    dispatch(actions.signOut())
  }
}

//sign in with google account
export const signInGoogleThunk = (account) => {
  return async (dispatch) => {
    dispatch(actions.setLoading(true))
    const provider = new firebase.auth.GoogleAuthProvider()
    const { user } = await auth.signInWithPopup(provider)
    dispatch(actions.signIn(user))
    dispatch(actions.setLoading(false))
  }
}
//sign in with email account
export const signInEmailThunk = (email, password) => {
  return async (dispatch) => {
    dispatch(actions.setLoading(true))
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(actions.signIn(response.user))
        dispatch(actions.setSignupFail(false))
        dispatch(actions.setMessage(null))
      })
      .catch((error) => {
        dispatch(actions.setSignupFail(true))
        dispatch(actions.setMessage(error.message))
      })
      dispatch(actions.setLoading(false))
  }
}
//register email account
export const signUpEmailThunk = (email, password) => {
  return async (dispatch) => {
    dispatch(actions.setLoading(true))
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(actions.setSignupFail(false))
        dispatch(actions.setMessage(`Successfully created account with email ${email}`))
      })
      .catch((error) => {
        dispatch(actions.setSignupFail(true))
        dispatch(actions.setMessage(error.message))
      })
    dispatch(actions.setLoading(false))
    dispatch(signOut())
  }
}

//getting all fav films for account
export const getFavFilmsThunk = () => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const favs = await firebase.firestore().collection('accounts').doc(uid).collection('favs').get()
    const docs = []
    favs.forEach((doc) => {
      docs.push(doc.data())
    })
    dispatch(actions.setFavs(docs))
  }
}
//getting all watchlist films for account
export const getWatchlistItemsThunk = () => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const favs = await firebase.firestore().collection('accounts').doc(uid).collection('watchlist').get()
    const docs = []
    favs.forEach((doc) => {
      docs.push(doc.data())
    })
    dispatch(actions.setWatchlist(docs))
  }
}
//getting all ratings for account
export const getRatingsThunk = () => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const ratings = await firebase.firestore().collection('accounts').doc(uid).collection('ratings').get()
    const docs = []
    ratings.forEach((rating) => {
      docs.push(rating.data())
    })
    dispatch(actions.setRatings(docs))
  }
}

//find film item rating, fav, watchlist
export const getFilmItemUserStats = (id) => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const Fav = await firebase.firestore().collection('accounts').doc(uid).collection('favs').doc(id).get()
    const ratings = await firebase.firestore().collection('accounts').doc(uid).collection('ratings').doc(id).get()
    const watchlist = await firebase.firestore().collection('accounts').doc(uid).collection('watchlist').doc(id).get()

    const isFav = Fav.data() == null ? false : true
    const isWatchlist = watchlist.data() == null ? false : true
    const rating = ratings.data() == null ? false : ratings.data().rating
    const review = ratings.data() == null ? false : ratings.data().review
    dispatch(setIsFav(isFav))
    dispatch(setRating(rating, review))
    dispatch(setIsWatchlist(isWatchlist))
  }
}

//remove film from fav
export const removeFromFavThunk = (filmId, page) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid

    if (loggedIn) {
      if (page === 'film') {
        await firebase.firestore().collection('accounts').doc(uid).collection('favs').doc(filmId).delete()
        dispatch(setIsFav(false))
      } else if (page === 'profile') {
        await firebase.firestore().collection('accounts').doc(uid).collection('favs').doc(filmId).delete()
        const favs = await firebase.firestore().collection('accounts').doc(uid).collection('favs').get()
        const docs = []
        favs.forEach((doc) => {
          docs.push(doc.data())
        })
        dispatch(actions.setFavs(docs))
      }
    }
  }
}
//remove film rating
export const removeRatingThunk = (filmId, page) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid

    if (loggedIn) {
      if (page === 'film') {
        await firebase.firestore().collection('accounts').doc(uid).collection('ratings').doc(filmId).delete()
        dispatch(setRating(false))
      } else if (page === 'profile') {
        await firebase.firestore().collection('accounts').doc(uid).collection('ratings').doc(filmId).delete()
        const favs = await firebase.firestore().collection('accounts').doc(uid).collection('ratings').get()
        const docs = []
        favs.forEach((doc) => {
          docs.push(doc.data())
        })
        dispatch(actions.setRatings(docs))
      }
    }
  }
}
//remove film from watchlist
export const removeFromWatchlistThunk = (filmId, page) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid

    if (loggedIn) {
      if (page === 'film') {
        await firebase.firestore().collection('accounts').doc(uid).collection('watchlist').doc(filmId).delete()
        dispatch(setIsWatchlist(false))
      } else if (page === 'profile') {
        await firebase.firestore().collection('accounts').doc(uid).collection('watchlist').doc(filmId).delete()
        const favs = await firebase.firestore().collection('accounts').doc(uid).collection('watchlist').get()
        const docs = []
        favs.forEach((doc) => {
          docs.push(doc.data())
        })
        dispatch(actions.setWatchlist(docs))
      }
    }
  }
}

//add film into fav
export const addToFavThunk = (filmId, name) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid
    const favFilm = {
      id: filmId,
      name: name,
    }
    if (loggedIn) {
      await firebase.firestore().collection('accounts').doc(uid).collection('favs').doc(filmId).set(favFilm)
      dispatch(setIsFav(true))
    }
  }
}
//add film into watchlist
export const addToWatchlistThunk = (filmId, name) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid
    const favFilm = {
      id: filmId,
      name: name,
    }
    if (loggedIn) {
      await firebase.firestore().collection('accounts').doc(uid).collection('watchlist').doc(filmId).set(favFilm)
      dispatch(setIsWatchlist(true))
    }
  }
}
//set film rating
export const setRatingThunk = (filmId, name, rating, review) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    let uid = getState().accountReducer.user.uid
    const favFilm = {
      id: filmId,
      name: name,
      rating: rating,
      review: review,
    }
    if (loggedIn) {
      await firebase.firestore().collection('accounts').doc(uid).collection('ratings').doc(filmId).set(favFilm)
      dispatch(setRating(rating))
    }
  }
}

//set username
export const setUsernameThunk = (name) => {
  return async (dispatch, getState) => {
    let loggedIn = getState().accountReducer.loggedIn
    const auth = getAuth()

    if (loggedIn) {
      await updateProfile(auth.currentUser, { displayName: name })
        .then((response) => {
          dispatch(actions.setSignupSuccess())
          dispatch(actions.setMessage(`Successfully updated name`))
        })
        .catch((error) => {
          dispatch(actions.setSignupFail())
          dispatch(actions.setMessage(error.message))
        })
    }
  }
}

//set user avatar
export const setAvatarThunk = (photo) => {
  return async (dispatch, getState) => {
    let uid = getState().accountReducer.user.uid
    const auth = getAuth()
    const storage = getStorage()
    let storageRef = ref(storage, `photos/${uid}`)
    await uploadBytes(storageRef, photo)
    const url = await getDownloadURL(storageRef)
    updateProfile(auth.currentUser, { photoURL: url })
      .then((response) => {
        dispatch(actions.setSignupSuccess())
        dispatch(actions.setMessage(`Successfully updated avatar`))
      })
      .catch((error) => {
        dispatch(actions.setSignupFail())
        dispatch(actions.setMessage(error.message))
      })
  }
}

export const setDarkModeThunk = (darkMode) => {
  return async (dispatch) => {
    dispatch(actions.setDarkMode(darkMode))
    localStorage.setItem('darkMode', darkMode)
  }
}

export default AccountReducer
