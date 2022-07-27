import { fireEvent, render, screen } from '@testing-library/react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { ModalProvider } from '~/context/modal-context'

const stepsMock = ['General info', 'Languages', 'Study category']

const setActiveStepMock = jest.fn()

describe('StepWrapper test with first active step', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepWrapper activeStep={0} setActiveStep={setActiveStepMock} steps={stepsMock} />
      </ModalProvider>
    )
  })

  it('should call setActiveStep after click on tab', () => {
    const firstTab = screen.getByText(/General info/i)

    fireEvent.click(firstTab)

    expect(setActiveStepMock).toHaveBeenCalled()
  })

  it('should call setActiveStep after click on next button', () => {
    setActiveStepMock.mockImplementation((fn) => fn())
    const nextBtn = screen.getByText(/Next/i)

    fireEvent.click(nextBtn)

    expect(setActiveStepMock).toHaveBeenCalled()
  })
})

describe('StepWrapper test with last active step', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepWrapper activeStep={2} setActiveStep={setActiveStepMock} steps={stepsMock} />
      </ModalProvider>
    )
  })

  it('should render finish button', () => {
    const finishBtn = screen.getByText(/Finish/i)

    fireEvent.click(finishBtn)

    expect(setActiveStepMock).not.toHaveBeenCalled()
  })

  it('should call setActiveStep after click on back button', () => {
    setActiveStepMock.mockImplementation((fn) => fn())
    const backBtn = screen.getByText(/Back/i)

    fireEvent.click(backBtn)

    expect(setActiveStepMock).toHaveBeenCalled()
  })
})
