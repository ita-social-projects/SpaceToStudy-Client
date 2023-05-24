import { render, screen } from '@testing-library/react'

import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

const mockedMatches = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useMatches: () => mockedMatches()
  }
})

const router = (children, initialEntries) =>
  createMemoryRouter(
    createRoutesFromElements(
      <Route
        element={<AppBreadCrumbs />}
        handle={{ crumb: { name: 'home', path: '/' } }}
        path='/'
      >
        {children}
      </Route>
    ),
    {
      initialEntries: [initialEntries]
    }
  )

describe('AppBreadCrumbs container', () => {
  it('should render all breadcrumbs', () => {
    const children = (
      <Route
        element={<div>expample</div>}
        handle={{ crumb: { name: 'expample', path: 'example' } }}
        path='example'
      >
        <Route
          element={<div>test</div>}
          handle={{ crumb: { name: 'test', path: 'test' } }}
          path='test'
        />
      </Route>
    )
    const initialEntries = '/example/test'
    mockedMatches.mockImplementationOnce(() => [
      { handle: { crumb: { name: 'home', path: '/' } } },
      { handle: { crumb: { name: 'expample', path: 'example' } } },
      { handle: { crumb: { name: 'test', path: 'test' } } }
    ])
    render(<RouterProvider router={router(children, initialEntries)} />)

    const breadCrumbs = screen.getAllByTestId('breadCrumb')

    expect(breadCrumbs.length).toBe(3)
  })
  it('should render two breadcrumb', () => {
    const children = (
      <Route
        element={<div>expample</div>}
        handle={{ crumb: { name: 'expample', path: 'example' } }}
        path='example'
      />
    )
    const initialEntries = '/example'
    mockedMatches.mockImplementationOnce(() => [
      { handle: { crumb: { name: 'home', path: '/' } } },
      { handle: { crumb: { name: 'expample', path: 'example' } } }
    ])
    render(<RouterProvider router={router(children, initialEntries)} />)

    const breadCrumbs = screen.getAllByTestId('breadCrumb')

    expect(breadCrumbs.length).toBe(2)
  })
  it('should not render breadcrumbs', () => {
    const children = <Route element={<div>expample</div>} path='example' />
    const initialEntries = '/example'
    mockedMatches.mockImplementationOnce(() => [
      { handle: { crumb: { name: 'home', path: '/' } } }
    ])
    render(<RouterProvider router={router(children, initialEntries)} />)

    const breadCrumbs = screen.queryAllByTestId('breadCrumb')

    expect(breadCrumbs.length).toBe(0)
  })
})
