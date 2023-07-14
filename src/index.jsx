import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '~/redux/store'
import { setupInterceptors } from '~/services/setup-interceptors'
import { router } from '~/router/router'
import '~/styles/index.css'
import '~/plugins/i18n'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

setupInterceptors(store)
