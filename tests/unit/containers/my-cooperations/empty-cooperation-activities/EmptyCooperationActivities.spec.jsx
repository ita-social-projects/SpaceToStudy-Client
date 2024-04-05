import { screen, fireEvent, act, waitFor } from '@testing-library/react'
import EmptyCooperationActivities from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities'
import { renderWithProviders } from '~tests/test-utils'

global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

describe('Cooperation activities', () => {
  beforeEach(() => {
    renderWithProviders(<EmptyCooperationActivities />)
  })

  it('should render button create', () => {
    const button = screen.getByText('cooperationsPage.button.create')

    expect(button).toBeInTheDocument()
  })

  it('should open menu course template after click on button and close menu after click on menu item', async () => {
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
