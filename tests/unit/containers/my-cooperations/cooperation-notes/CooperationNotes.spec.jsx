import { fireEvent, screen, waitFor } from '@testing-library/react'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import { renderWithProviders } from '~tests/test-utils'

describe('CooperationNotes', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CooperationNotes />))
  })

  it('should render CooperationNotes components', () => {
    const notes = screen.getByText('cooperationsPage.details.notes')

    expect(notes).toBeInTheDocument()
  })

  it('should open create note form', () => {
    const addNoteBtn = screen.getByTestId('AddIcon')
    fireEvent.click(addNoteBtn)
    const noteFormSettings = screen.getByText(
      'cooperationsPage.notes.privateSetting'
    )
    expect(noteFormSettings).toBeInTheDocument()
  })
})
