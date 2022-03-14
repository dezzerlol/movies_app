import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import FilmReducer from '../store/FilmReducer'

let reducers = combineReducers({
  filmReducer: FilmReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware))) //store to use with chrome redux extension
// let store = createStore(reducers, applyMiddleware(thunkMiddleware)) //default store


window.__store__ = store

export default store
