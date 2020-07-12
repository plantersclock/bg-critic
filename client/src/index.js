import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import theme from './theme'
import { ThemeProvider } from '@material-ui/core'

ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById('root'))
