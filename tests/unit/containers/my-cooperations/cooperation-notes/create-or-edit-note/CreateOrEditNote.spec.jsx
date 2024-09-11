import { fireEvent, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { beforeEach } from 'vitest'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import { renderWithProviders } from '~tests/test-utils'

const addNewNoteMock = vi.fn()

const noteMock = { text: 'noteText', isPrivate: true }

describe('CreateOrEditNote component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CreateOrEditNote onSubmit={addNewNoteMock} onSubmitLoading={false} />
      )
    })
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
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CreateOrEditNote
          note={noteMock}
          onSubmit={addNewNoteMock}
          onSubmitLoading={false}
        />
      )
    })
  })

  it('should set note as initial data to form', () => {
    const noteText = screen.getByText(noteMock.text)

    expect(noteText).toBeInTheDocument()
  })
})
