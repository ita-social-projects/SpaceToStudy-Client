import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '~/redux/store'
import { setupInterceptors } from '~/services/setup-interceptors'
import { router } from '~/router/router'
import '~/styles/index.css'
import '~/plugins/i18n'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

setupInterceptors(store)
