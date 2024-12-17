import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '~/redux/store'
import { setupInterceptors } from '~/services/setup-interceptors'
import QueryProvider from '~/QueryProvider'
import { router } from '~/router/router'
import '~/styles/index.css'
import '~scss/styles.scss'
import '~/plugins/i18n'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </Provider>
  </React.StrictMode>
)

setupInterceptors()
