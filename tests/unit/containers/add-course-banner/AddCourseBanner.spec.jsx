import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import AddCourseBanner from '~/containers/add-course-banner/AddCourseBanner'
import { renderWithProviders } from '~tests/test-utils'

const mockedFile = new File(['test data'], 'test.png', { type: 'image/png' })

describe('AddCourseBanner Component', () => {
  const formData = new FormData()

  beforeEach(() => {
    renderWithProviders(<AddCourseBanner formData={formData} />)
    global.URL.createObjectURL = vi.fn(() => 'test-url')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Should find text', () => {
    const addBannerText = screen.getByText(
      'myCoursesPage.newCourse.bannerTitle'
    )
    expect(addBannerText).toBeInTheDocument()
  })

  it('handles file input change', () => {
    const fileInput = screen.getByTestId('file-input')

    const testEvent = {
      target: {
        files: [mockedFile]
      }
    }
    fireEvent.change(fileInput, testEvent)
    expect(formData.get('banner')).toEqual(mockedFile)
  })
})
