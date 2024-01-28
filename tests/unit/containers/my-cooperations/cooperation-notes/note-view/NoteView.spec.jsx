import { screen, fireEvent, act } from '@testing-library/react'
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

const privateNote = {
  ...mockedNote,
  isPrivate: true
}

const deleteItem = vi.fn()
const duplicateItem = vi.fn()

describe('NoteView component', () => {
  beforeEach(() => {
    renderWithProviders(
      <NoteView
        deleteItem={deleteItem}
        duplicateItem={duplicateItem}
        note={mockedNote}
      />,
      { preloadedState: userState }
    )
  })

  it('should render note', () => {
    const userNote = screen.getByText(mockedNote.text)

    expect(userNote).toBeInTheDocument()
  })

  it('should called delete note', async () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    await act(async () => {
      fireEvent.click(moreIcon)
    })

    const deleteIcon = screen.getByTestId('DeleteOutlineIcon')

    fireEvent.click(deleteIcon)

    expect(deleteItem).toHaveBeenCalled()
  })

  it('should called duplicate note', () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    fireEvent.click(moreIcon)

    const duplicateIcon = screen.getByTestId('ContentCopyIcon')

    fireEvent.click(duplicateIcon)

    expect(duplicateItem).toHaveBeenCalledWith(mockedNote._id)
  })
})

describe('NoteView component with private note', () => {
  beforeEach(() => {
    renderWithProviders(
      <NoteView
        deleteItem={deleteItem}
        duplicateItem={duplicateItem}
        note={privateNote}
      />,
      {
        preloadedState: userState
      }
    )
  })

  it('should render delete action for private note', () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    fireEvent.click(moreIcon)

    const deleteAction = screen.getByTestId('DeleteOutlineIcon')

    expect(deleteAction).toBeInTheDocument()

    const duplicateAction = screen.queryByTestId('ContentCopyIcon')

    expect(duplicateAction).not.toBeInTheDocument()
  })

  it('should call deleteItem when delete action is clicked', () => {
    const moreIcon = screen.getByTestId('MoreVertIcon')

    fireEvent.click(moreIcon)

    const deleteAction = screen.getByTestId('DeleteOutlineIcon')

    fireEvent.click(deleteAction)

    expect(deleteItem).toHaveBeenCalledWith(privateNote._id)
  })
})
