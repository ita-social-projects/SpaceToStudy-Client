import { fireEvent, render, screen } from '@testing-library/react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { ModalProvider } from '~/context/modal-context'

const stepsMock = ['General info', 'Languages', 'Study category']

const childrenArrMock = ['1', '2', '3']

describe('StepWrapper test', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepWrapper steps={ stepsMock }>
          { childrenArrMock }
        </StepWrapper>
      </ModalProvider>
    )
  })

  it('should render second children after click on tab', () => {
    const secondTab = screen.getByText(/Languages/i)

    fireEvent.click(secondTab)

    const secondChildren = screen.getByText(/2/i)

    expect(secondChildren).toBeInTheDocument()
  })

  it('should render finish button', () => {
    const nextBtn = screen.getByText(/Next/i)

    fireEvent.click(nextBtn)
    fireEvent.click(nextBtn)

    const finishBtn = screen.getByText(/Finish/i)

    fireEvent.click(finishBtn)

    expect(jest.fn()).not.toHaveBeenCalled()
  })

  it('should render first children after click on next and back button', () => {
    const nextBtn = screen.getByText(/Next/i)
    const backBtn = screen.getByText(/Back/i)

    fireEvent.click(nextBtn)
    fireEvent.click(backBtn)

    const firstChildren = screen.getByText(/1/i)

    expect(firstChildren).toBeInTheDocument()
  })
})
