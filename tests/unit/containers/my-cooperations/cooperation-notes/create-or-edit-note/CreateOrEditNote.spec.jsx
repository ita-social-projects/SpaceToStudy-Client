import { fireEvent, screen } from '@testing-library/react'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import { renderWithProviders } from '~tests/test-utils'

const addNewNoteMock = vi.fn()

describe('CreateOrEditNote component', () => {
  beforeEach(() => {
    renderWithProviders(<CreateOrEditNote addNewNote={addNewNoteMock} />)
  })

  it('should render component', () => {
    const noteSettings = screen.getByText(
      'cooperationsPage.notes.privateSetting'
    )
    expect(noteSettings).toBeInTheDocument()
  })

  it('should crete new note', () => {
    const createBtn = screen.getByText('common.save')
    fireEvent.click(createBtn)
    expect(addNewNoteMock).toHaveBeenCalled()
  })

  it('should change private note setting value on click', () => {
    const checkbox = screen.queryByRole('checkbox')
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(true)
  })
})
