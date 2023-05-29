import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'

import { StepProvider } from '~/context/step-context'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import {
  studentStepLabels,
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'

import { renderWithProviders } from '~tests/test-utils'

const stepsMock = tutorStepLabels || studentStepLabels

const childrenArrMock = [
  <TempComponent key='1'>1</TempComponent>,
  <TempComponent key='2'>2</TempComponent>,
  <TempComponent key='3'>3</TempComponent>,
  <TempComponent key='4'>4</TempComponent>
]

describe('StepWrapper test', () => {
  beforeEach(() => {
    renderWithProviders(
      <StepProvider initialValues={initialValues} stepLabels={stepsMock}>
        <StepWrapper steps={stepsMock}>{childrenArrMock}</StepWrapper>
      </StepProvider>
    )
  })

  it('should render second children after click on tab', () => {
    const secondTab = screen.getByText(/step.stepLabels.language/i)

    fireEvent.click(secondTab)

    const secondChildren = screen.getByText(/3/i)

    expect(secondChildren).toBeInTheDocument()
  })

  it('should render finish button', () => {
    let nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    nextBtn = screen.getByText(/Next/i)
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
