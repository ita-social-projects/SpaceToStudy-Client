import { fireEvent, screen } from '@testing-library/react'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import { renderWithProviders } from '~tests/test-utils'

const addNewNoteMock = vi.fn()

const noteMock = { text: 'noteText', isPrivate: true }

describe('CreateOrEditNote component', () => {
  beforeEach(() => {
    renderWithProviders(
      <CreateOrEditNote onSubmit={addNewNoteMock} onSubmitLoading={false} />
    )
  })

  it('should render component', () => {
    const noteSettings = screen.getByText(
      'cooperationsPage.notes.privateSetting'
    )
    expect(noteSettings).toBeInTheDocument()
  })

  it('should create a new note', () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'New note text' } })

    expect(input.value).toBe('New note text')

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

describe('CreateOrEditNote component with initial note', () => {
  it('should set note as initial data to form', () => {
    renderWithProviders(
      <CreateOrEditNote
        note={noteMock}
        onSubmit={addNewNoteMock}
        onSubmitLoading={false}
      />
    )

    const noteText = screen.getByText(noteMock.text)

    expect(noteText).toBeInTheDocument()
  })
})
