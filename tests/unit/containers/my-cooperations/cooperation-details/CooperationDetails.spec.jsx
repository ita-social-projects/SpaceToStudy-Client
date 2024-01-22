import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import CooperationDetails from '~/containers/my-cooperations/cooperation-details/CooperationDetails'

describe('CooperationDetails', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CooperationDetails />))
  })

  it('should render details page', () => {
    const notesButton = screen.getByText('cooperationsPage.details.notes')

    expect(notesButton).toBeInTheDocument()
  })

  it('should render the component with tabs', () => {
    const tab1 = screen.getByText('cooperationsPage.tabs.activities')

    expect(tab1).toBeInTheDocument()

    const tab2 = screen.getByText('cooperationsPage.tabs.details')

    fireEvent.click(tab2)

    expect(tab2).toBeInTheDocument()
  })

  it('should toggle notes block', () => {
    const notes = screen.getByText('cooperationsPage.details.notes')

    fireEvent.click(notes)

    const notesIcon = screen.getAllByTestId('AddIcon')[1]

    expect(notesIcon).toBeInTheDocument()

    fireEvent.click(notes)

    expect(notesIcon).not.toBeInTheDocument()
  })
})
