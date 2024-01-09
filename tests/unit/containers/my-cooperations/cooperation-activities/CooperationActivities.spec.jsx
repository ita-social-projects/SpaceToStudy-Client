import { screen } from '@testing-library/react'
import CooperationActivities from '~/containers/my-cooperations/cooperation-activities/CooperationActivities'
import { renderWithProviders } from '~tests/test-utils'

describe('Cooperation activities', () => {
  it('should render button create', () => {
    renderWithProviders(<CooperationActivities />)

    const button = screen.getByText('cooperationsPage.button.create')

    expect(button).toBeInTheDocument()
  })
})
