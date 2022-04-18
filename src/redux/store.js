import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import FilmReducer from './FilmReducer'
import AccountReducer from './AccountReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

let reducers = combineReducers({
  filmReducer: FilmReducer,
  accountReducer: AccountReducer,
})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.__store__ = store

export default store
