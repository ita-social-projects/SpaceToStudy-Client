import { screen, fireEvent, act, waitFor } from '@testing-library/react'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import { renderWithProviders } from '~tests/test-utils'
import { CooperationNotesService } from '~/services/cooperation-service'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

vi.mock('~/services/cooperation-service')

const mockNotesData = [
  {
    _id: '65b03361bf20871d3adaeb9c',
    text: 'Test note content',
    author: {
      _id: '6565fd508a848ff2202df79c',
      firstName: 'User',
      lastName: 'Test'
    },
    isPrivate: false,
    cooperation: '65afbd053d67b51996a67c4c',
    createdAt: '2024-01-23T21:45:05.200Z',
    updatedAt: '2024-01-23T21:45:05.200Z'
  },
  {
    _id: '65b03361bf20871d3a3aeb9c',
    text: 'Test note content',
    author: {
      _id: '6565fd508a848ff2202df79c',
      firstName: 'User',
      lastName: 'Test'
    },
    isPrivate: false,
    cooperation: '65afbd053d67b51996a67c4c',
    createdAt: '2024-01-23T21:45:05.200Z',
    updatedAt: '2024-01-23T21:45:05.200Z'
  }
]

const userState = {
  appMain: { userRole: 'tutor', userId: mockNotesData[0].author._id }
}

describe('CooperationNotes', () => {
  beforeEach(() => {
    CooperationNotesService.getNotes.mockResolvedValue({
      data: mockNotesData
    })
    renderWithProviders(
      <ConfirmationDialogProvider>
        <CooperationNotes />
      </ConfirmationDialogProvider>,
      { preloadedState: userState }
    )
  })

  it('should render CooperationNotes components', () => {
    const notes = screen.getByText('cooperationsPage.details.notes')

    expect(notes).toBeInTheDocument()
  })

  it('should open create note form and save the note', async () => {
    const addNoteBtn = screen.getByTestId('AddIcon')

    act(() => fireEvent.click(addNoteBtn))

    const noteFormSettings = screen.getByText(
      'cooperationsPage.notes.privateSetting'
    )

    expect(noteFormSettings).toBeInTheDocument()

    const noteTextInput = screen.getByLabelText(
      'cooperationsPage.notes.noteText'
    )
    const saveButton = screen.getByRole('button', { name: 'common.save' })

    act(() =>
      fireEvent.change(noteTextInput, {
        target: { value: 'Newly created note' }
      })
    )
    act(() => fireEvent.click(saveButton))

    CooperationNotesService.createNote.mockResolvedValue({
      data: mockNotesData
    })

    await waitFor(() => {
      const newNoteText = screen.getByText('Newly created note')
      expect(newNoteText).toBeInTheDocument()
    })
  })

  it('should close create note form', () => {
    const addNoteBtn = screen.getByTestId('AddIcon')

    act(() => fireEvent.click(addNoteBtn))

    const cancelButton = screen.getByText('common.cancel')

    act(() => fireEvent.click(cancelButton))

    const noteFormSettings = screen.queryByText(
      'cooperationsPage.notes.privateSetting'
    )

    expect(noteFormSettings).toBeNull()
  })

  it('should enable the edit mode and handle updates', () => {
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')

    act(() => fireEvent.click(menuButton))

    const editButton = screen.getByTestId('EditIcon')

    act(() => fireEvent.click(editButton))

    const [noteTextInput] = screen.getAllByDisplayValue(mockNotesData[0].text)
    const saveButton = screen.getByRole('button', { name: 'common.save' })

    act(() =>
      fireEvent.change(noteTextInput, { target: { value: 'New note text' } })
    )
    act(() => fireEvent.click(saveButton))

    CooperationNotesService.updateNote.mockResolvedValue({
      data: mockNotesData
    })

    const newNoteText = screen.getByText('New note text')

    expect(newNoteText).toBeInTheDocument()
  })

  it('should handle duplicate notes', async () => {
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')

    act(() => fireEvent.click(menuButton))

    const duplicateButton = screen.getByTestId('ContentCopyIcon')

    act(() => fireEvent.click(duplicateButton))

    await waitFor(() => {
      expect(duplicateButton).not.toBeInTheDocument()
    })
  })

  it('should handle delete notes', async () => {
    const [menuButton] = screen.getAllByTestId('MoreVertIcon')

    act(() => fireEvent.click(menuButton))

    const deleteButton = screen.getByTestId('DeleteOutlineIcon')

    act(() => fireEvent.click(deleteButton))

    const confirmButton = screen.getByRole('button', { name: 'common.yes' })

    act(() => fireEvent.click(confirmButton))

    await waitFor(() => {
      expect(confirmButton).not.toBeInTheDocument()
    })
  })
})

describe('CooperationNotes with error', () => {
  const fakeError = {
    message: 'Something went wrong'
  }

  beforeEach(() => {
    CooperationNotesService.getNotes.mockRejectedValue({
      response: { data: fakeError }
    })
    renderWithProviders(<CooperationNotes />, { preloadedState: userState })
  })

  it('should show the error message', () => {
    const errorAlert = screen.getByText(`errors.${fakeError.message}`)

    expect(errorAlert).toBeInTheDocument()
  })
})
