import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import CreateOrEditNote from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { getFullUrl } from '~/utils/get-full-url'

const addNewNoteMock = vi.fn()

const noteMock = { text: 'cooperationsPage.notes.noteText', isPrivate: true }
const userMock = {
  _id: '648850c4fdc2d1a130c24aea',
  role: 'tutor',
  firstName: 'Test',
  lastName: 'User',
  photo: 'https://www.google.com'
}

const appMain = {
  appMain: { userRole: 'tutor', userId: '648850c4fdc2d1a130c24aea' }
}

beforeEach(() => {
  const url = getFullUrl({
    parameters: { id: userMock._id },
    pathname: URLs.users.getUserById,
    searchParameters: { userRole: userMock.role }
  })
  mockAxiosClient.onGet(url).reply(200, userMock)
  renderWithProviders(
    <CreateOrEditNote onSubmit={addNewNoteMock} onSubmitLoading={false} />,
    {
      preloadedState: appMain
    }
  )
})

describe('CreateOrEditNote component', () => {
  it('should render component', async () => {
    const noteSettings = await screen.findByText(
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
  it('should set note as initial data to form', async () => {
    const noteText = await screen.findByText(noteMock.text)
    expect(noteText).toBeInTheDocument()
  })
})
