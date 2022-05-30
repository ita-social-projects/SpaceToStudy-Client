import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from '~/App'
import '~/styles/index.css'
import '~/plugins/i18n'


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={ store }>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
  ,
  document.getElementById('root')
)

