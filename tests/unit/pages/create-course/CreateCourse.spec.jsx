import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent, waitFor } from '@testing-library/react'

import CreateCourse from '~/pages/create-course/CreateCourse'

const mockedNavigate = vi.fn()

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
})
