import { screen, fireEvent, act, waitFor } from '@testing-library/react'
import EmptyCooperationActivities from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities'
import { renderWithProviders } from '~tests/test-utils'

global.window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn()
}))

const mockedState = (role) => ({ appMain: { userRole: role } })

describe('Cooperation activities for tutor', () => {
  beforeEach(() => {
    renderWithProviders(<EmptyCooperationActivities />, {
      preloadedState: mockedState('tutor')
    })
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

describe('Cooperation empty activities for student', () => {
  beforeEach(() => {
    renderWithProviders(<EmptyCooperationActivities />, {
      preloadedState: mockedState('student')
    })
  })

  it('Should render component with content', () => {
    const studentDescriptionText = screen.getByText(
      /cooperationsPage\.description\.seems/i
    )
    expect(studentDescriptionText).toBeInTheDocument()

    const noActivities = screen.getByText(
      'cooperationsPage.description.noActivities'
    )
    expect(noActivities).toBeInTheDocument()

    const engageTutor = screen.getByText(
      /cooperationsPage\.description\.engageTutor/i
    )
    expect(engageTutor).toBeInTheDocument()
  })
})
