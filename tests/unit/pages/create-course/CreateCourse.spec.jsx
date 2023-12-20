import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent, waitFor } from '@testing-library/react'

import CreateCourse from '~/pages/create-course/CreateCourse'

const mockedNavigate = vi.fn()

const categoriesNamesMock = [
  { _id: '660c27618a9fbf234b8bb4cf', name: 'Music' },
  { _id: '660c27618a9fbf234b8bb4cd', name: 'Sport' }
]

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate
}))

describe('CreateCourse', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CreateCourse />))
  })

  it('should render cancel and save buttons', () => {
    const cancelButton = screen.getByText('common.cancel')
    expect(cancelButton).toBeInTheDocument()

    const saveButton = screen.getByText('common.save')
    expect(saveButton).toBeInTheDocument()
  })

  it('redirect by clicking cancel button', () => {
    const cancelButton = screen.getByText('common.cancel')

    fireEvent.click(cancelButton)

    expect(mockedNavigate).toHaveBeenCalled()
  })

  it('redirect by clicking save button', () => {
    const saveButton = screen.getByText('common.save')

    fireEvent.click(saveButton)

    expect(mockedNavigate).toHaveBeenCalled()
  })

  it('should render add section button', () => {
    const addSectionButton = screen.getByText('course.addSectionBtn')

    expect(addSectionButton).toBeInTheDocument()
  })

  it('should change input section data', () => {
    waitFor(() => {
      const sectionTitleInput = screen.getByLabelText(
        'course.courseSection.defaultNewTitle'
      )

      fireEvent.blur(sectionTitleInput, {
        target: { value: 'New Section Title' }
      })

      expect(sectionTitleInput.value).toBe('New Section Title')
    })
  })

  it('should choose the category from options list', async () => {
    const autocomplete = screen.getAllByRole('combobox')[0]

    expect(autocomplete).toBeInTheDocument()
    expect(autocomplete.value).toBe('')

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.change(autocomplete, {
      target: { value: categoriesNamesMock[1].name }
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    await waitFor(() => {
      expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
  })
})
