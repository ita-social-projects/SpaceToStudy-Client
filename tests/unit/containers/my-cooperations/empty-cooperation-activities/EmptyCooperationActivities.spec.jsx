import { screen, fireEvent, act, waitFor } from '@testing-library/react'
import EmptyCooperationActivities from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities'
import { renderWithProviders } from '~tests/test-utils'

describe('Cooperation activities', () => {
  it('should render button create', () => {
    renderWithProviders(<EmptyCooperationActivities />)

    const button = screen.getByText('cooperationsPage.button.create')

    expect(button).toBeInTheDocument()
  })

  it('should open menu course template after click on button and close menu after click on menu item', async () => {
    renderWithProviders(<EmptyCooperationActivities />)

    const button = screen.getByText('cooperationsPage.button.create')
    act(() => {
      fireEvent.click(button)
    })
    const menuTemplate = await screen.findByText(
      'cooperationsPage.manyTypes.courseTemplate'
    )
    expect(menuTemplate).toBeInTheDocument()

    act(() => {
      fireEvent.click(menuTemplate)
    })

    await waitFor(() => {
      expect(menuTemplate).not.toBeInTheDocument()
    })
  })

  it('should open menu from scratch after click on button and close menu after click on menu item', async () => {
    renderWithProviders(<EmptyCooperationActivities />)

    const button = screen.getByText('cooperationsPage.button.create')
    act(() => {
      fireEvent.click(button)
    })

    const menuScratch = await screen.findByText(
      'cooperationsPage.manyTypes.scratch'
    )
    expect(menuScratch).toBeInTheDocument()

    act(() => {
      fireEvent.click(menuScratch)
    })

    await waitFor(() => {
      expect(menuScratch).not.toBeInTheDocument()
    })
  })
})
