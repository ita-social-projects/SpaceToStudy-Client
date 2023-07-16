import { ThemeProvider } from '@mui/material/styles'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import {
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements
} from 'react-router-dom'
import { student, tutor } from '~/constants'
import reducer from '~/redux/reducer'
import { theme } from '~/styles/app-theme/custom-mui.styles'

import { vi } from 'vitest'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { routerConfig } from '~/router/router'

vi.mock('~/hooks/use-axios')

window.scrollTo = vi.fn()

const renderWithRouter = (initialEntries, preloadedState) => {
  const store = configureStore({
    reducer: { appMain: reducer },
    preloadedState
  })
  const router = createMemoryRouter(createRoutesFromElements(routerConfig), {
    initialEntries: [initialEntries]
  })

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

const createPath = (...routes) => {
  return `${guestRoutes.home.route}${routes.join('/')}`
}

describe.skip('router test', () => {
  describe('guest routes', () => {
    it('shoud render private policy page', async () => {
      renderWithRouter(createPath(guestRoutes.privacyPolicy.route), {
        appMain: { loding: false, userRole: '' }
      })
      const privacyPolicyTitle = await screen.findByText(
        'cookiePolicyPage.cookiePolicy.title'
      )
      await waitFor(() => expect(privacyPolicyTitle).toBeInTheDocument())
    })
    it('shoud render guest home page', async () => {
      renderWithRouter(guestRoutes.home.route, {
        appMain: { loding: false, userRole: '' }
      })
      const welcomeBlock = await screen.findByText(
        'guestHomePage.welcomeBlock.getStarted'
      )
      await waitFor(() => expect(welcomeBlock).toBeInTheDocument())
    })
  })
  describe.skip('student routes', () => {
    it('should render student home page', async () => {
      renderWithRouter(guestRoutes.home.route, {
        appMain: { loding: false, userRole: student }
      })
      const findTutorTitle = await screen.findByText(
        'studentHomePage.findTutorBlock.title'
      )
      await waitFor(() => expect(findTutorTitle).toBeInTheDocument())
    })
    it('should render student profile page', async () => {
      renderWithRouter(studentRoutes.accountMenu.myProfile.path, {
        appMain: { loding: false, userRole: student }
      })
      const studentPagePlaceholder = await screen.findByText(
        'StudentProfile Page Placeholder'
      )
      await waitFor(() => expect(studentPagePlaceholder).toBeInTheDocument())
    })
    it('should render student findTutor page', async () => {
      renderWithRouter(studentRoutes.findTutor.path, {
        appMain: { loding: false, userRole: student }
      })
      const findTutorPagePlaceholder = await screen.findByText(
        'FindTutor Page Placeholder'
      )
      await waitFor(() => expect(findTutorPagePlaceholder).toBeInTheDocument())
    })
    it('should render error on protected route', async () => {
      renderWithRouter(createPath(guestRoutes.student.route), {
        appMain: { loding: false, userRole: '' }
      })
      const error = await screen.findByText('errorPage.401.title')
      await waitFor(() => expect(error).toBeInTheDocument())
    })
  })
  describe.skip('tutor routes', () => {
    it('should render tutor home page', async () => {
      renderWithRouter(createPath(guestRoutes.tutor.route), {
        appMain: { loding: false, userRole: tutor }
      })
      const tutorHomePagePlaceholder = await screen.findByText('Hello Tutor!')
      await waitFor(() => expect(tutorHomePagePlaceholder).toBeInTheDocument())
    })
    it('should render error on protected route', async () => {
      renderWithRouter(createPath(guestRoutes.tutor.route), {
        appMain: { loding: false, userRole: student }
      })
      const error = await screen.findByText('errorPage.401.title')
      await waitFor(() => expect(error).toBeInTheDocument())
    })
  })
  describe.skip('error routes', () => {
    it('should render bad request error', async () => {
      renderWithRouter(
        createPath(guestRoutes.error.route, errorRoutes.badRequest.route),
        {
          appMain: { loding: false, userRole: '' }
        }
      )
      const error = await screen.findByText('errorPage.400.title')
      await waitFor(() => expect(error).toBeInTheDocument())
    })
    it('should render internal server error', async () => {
      renderWithRouter(
        createPath(
          guestRoutes.error.route,
          errorRoutes.internalServerError.route
        ),
        {
          appMain: { loding: false, userRole: '' }
        }
      )
      const error = await screen.findByText('errorPage.500.title')
      await waitFor(() => expect(error).toBeInTheDocument())
    })
    it('should render not found error on bad path', async () => {
      renderWithRouter(createPath('badPath'), {
        appMain: { loding: false, userRole: '' }
      })
      const error = await screen.findByText('errorPage.404.title')
      await waitFor(() => expect(error).toBeInTheDocument())
    })
  })
  it('shoud render loader after logout', async () => {
    renderWithRouter(studentRoutes.accountMenu.logout.path, {
      appMain: { loding: false, userRole: '' }
    })
    await waitFor(async () =>
      expect(await screen.findByTestId('loader')).toBeInTheDocument()
    )
  })
})
