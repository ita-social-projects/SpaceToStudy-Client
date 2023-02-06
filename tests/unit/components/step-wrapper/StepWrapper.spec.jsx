import { fireEvent, render, screen } from '@testing-library/react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from '~/containers/tutor-home-page/become-a-tutor/TempComponent'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'
import { vi } from 'vitest'

const stepsMock = ['General info', 'Languages', 'Study category']

const childrenArrMock = [
  <TempComponent key='1'>1</TempComponent>,
  <TempComponent key='2'>2</TempComponent>,
  <TempComponent key='3'>3</TempComponent>
]

describe('StepWrapper test', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepProvider>
          <StepWrapper steps={ stepsMock }>
            { childrenArrMock }
          </StepWrapper>
        </StepProvider>
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
    let nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const finishBtn = screen.getByText(/Finish/i)

    fireEvent.click(finishBtn)

    expect(vi.fn()).not.toHaveBeenCalled()
  })

  it('should render first children after click on next and back button', () => {
    const nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const backBtn = screen.getByText(/Back/i)
    fireEvent.click(backBtn)

    const firstChildren = screen.getByText(/1/i)

    expect(firstChildren).toBeInTheDocument()
  })
})
