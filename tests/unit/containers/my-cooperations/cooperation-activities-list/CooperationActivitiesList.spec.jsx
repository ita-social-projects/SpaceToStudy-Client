import { screen, fireEvent } from '@testing-library/react'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { renderWithProviders } from '~tests/test-utils'

describe('CooperationActivitiesList', () => {
  it('should add a new section when Add activity button is clicked', async () => {
    renderWithProviders(<CooperationActivitiesList />)
    const hoverElement = await screen.findByTestId('addActivity-container')
    fireEvent.mouseOver(hoverElement)

    const addButton = screen.getByText('Add activity')
    fireEvent.click(addButton)
    const menuItem = await screen.findByText(
      'cooperationsPage.manyTypes.module'
    )
    fireEvent.click(menuItem)
    const sections = await screen.findAllByTestId('addActivity-container')
    expect(sections.length).toBe(2)
  })
})
