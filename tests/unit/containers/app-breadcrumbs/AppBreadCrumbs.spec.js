import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'

describe('AppBreadCrumbs container', () => {
  it('should render breadcrumbs links and last breadcrumb as typography', () => {
    renderWithProviders(<AppBreadCrumbs />, { initialEntries: '/student/example/path' })
    const breadCrumbs = screen.getAllByTestId('breadCrumb')
    const lastBreadCrumb = screen.getByTestId('lastBreadCrumb')

    expect(breadCrumbs.length).toBe(1)
    expect(lastBreadCrumb).toBeInTheDocument()
  })
  it('should render only last breadcrumb', () => {
    renderWithProviders(<AppBreadCrumbs />, { initialEntries: '/student/path' })
    const breadCrumbs = screen.queryAllByTestId('breadCrumb')
    const lastBreadCrumb = screen.getByTestId('lastBreadCrumb')

    expect(breadCrumbs.length).toBe(0)
    expect(lastBreadCrumb).toBeInTheDocument()
  })
  it('should not render  breadcrumbs', () => {
    renderWithProviders(<AppBreadCrumbs />, { initialEntries: '/student' })
    const breadCrumbs = screen.queryAllByTestId('breadCrumb')
    const lastBreadCrumb = screen.queryByTestId('lastBreadCrumb')

    expect(breadCrumbs.length).toBe(0)
    expect(lastBreadCrumb).not.toBeInTheDocument()
  })
})
