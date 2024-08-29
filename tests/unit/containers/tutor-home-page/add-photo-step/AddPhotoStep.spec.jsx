import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import { StepProvider } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'

import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'

vi.mock('~/hooks/use-breakpoints')

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('AddPhotoStep test', () => {
  const desktopData = {
    isLaptopAndAbove: true,
    isMobile: false,
    isTablet: false
  }

  beforeEach(() => {
    useBreakpoints.mockImplementation(() => desktopData)
    window.URL.createObjectURL = vi.fn(() => 'image/png')
    render(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <AddPhotoStep btnsBox={btnsBox} stepLabel={'photo'} />
      </StepProvider>
    )
  })

  it('should render placeholder', () => {
    const placeholder = screen.getByText('becomeTutor.photo.placeholder')

    expect(placeholder).toBeInTheDocument()
  })

  it('should render description', () => {
    const text = screen.getByText('becomeTutor.photo.description')

    expect(text).toBeInTheDocument()
  })

  it('should render back and next buttons', () => {
    const buttonBack = screen.getByText('back')
    const buttonNext = screen.getByText('next')

    expect(buttonBack).toBeInTheDocument()
    expect(buttonNext).toBeInTheDocument()
  })

  it('should render error text after add wrong file type', async () => {
    const fakeFile = new File(['photo'], 'test-file.pdf', {
      type: 'application/pdf'
    })

    const input = screen.getByLabelText('becomeTutor.photo.button')
    fireEvent.change(input, { target: { files: [fakeFile] } })
    const error = await screen.findByText('becomeTutor.photo.typeError')

    expect(error).toBeInTheDocument()
  })
})
