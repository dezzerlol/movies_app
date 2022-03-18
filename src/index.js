import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import store from './store/redux-store'
import './index.module.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F83646',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },

  typography: {
    fontFamily: 'Roboto',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename='/'>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
