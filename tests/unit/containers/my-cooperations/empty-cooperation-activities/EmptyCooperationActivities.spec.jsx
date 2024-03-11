import { screen } from '@testing-library/react'
import EmptyCooperationActivities from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities'
import { renderWithProviders } from '~tests/test-utils'

describe('Cooperation activities', () => {
  it('should render button create', () => {
    renderWithProviders(<EmptyCooperationActivities />)

    const button = screen.getByText('cooperationsPage.button.create')

    expect(button).toBeInTheDocument()
  })
})
