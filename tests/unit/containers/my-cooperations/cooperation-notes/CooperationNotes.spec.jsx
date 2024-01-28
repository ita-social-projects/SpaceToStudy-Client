import { screen, fireEvent } from '@testing-library/react'
import CooperationNotes from '~/containers/my-cooperations/cooperation-notes/CooperationNotes'
import { renderWithProviders } from '~tests/test-utils'
import { CooperationNotesService } from '~/services/cooperation-service'

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

vi.mock('~/services/cooperation-service', () => ({
  CooperationNotesService: {
    getNotes: vi.fn()
  }
}))

describe('CooperationNotes', () => {
  beforeEach(() => {
    renderWithProviders(<CooperationNotes />)
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

  it('fetches data successfully', () => {
    CooperationNotesService.getNotes.mockResolvedValue({ data: mockNotesData })
  })

  it('should close create note form', () => {
    const addNoteBtn = screen.getByTestId('AddIcon')

    fireEvent.click(addNoteBtn)

    const cancelButton = screen.getByText('common.cancel')

    fireEvent.click(cancelButton)

    const noteFormSettings = screen.queryByText(
      'cooperationsPage.notes.privateSetting'
    )

    expect(noteFormSettings).toBeNull()
  })
})
