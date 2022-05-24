import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './redux/root.reducer'
import App from '~/App'
import '~/styles/index.css'
import '~/plugins/i18n'


const store = createStore(rootReducer())

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

