import { screen } from '@testing-library/react'
import NoteView from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView'
import { renderWithProviders } from '~tests/test-utils'

const userId = '6565fd508a848ff2202df79c'
const userState = {
  appMain: { userRole: 'tutor', userId }
}

const mockedNote = {
  _id: '65b03361bf20871d3adaeb9c',
  text: 'sfddsfsdfds',
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

describe('NoteView component', () => {
  beforeEach(() => {
    renderWithProviders(<NoteView note={mockedNote} />, {
      preloadedState: userState
    })
  })

  it('should render note', () => {
    const userNote = screen.getByText(mockedNote.text)
    expect(userNote).toBeInTheDocument()
  })
})
