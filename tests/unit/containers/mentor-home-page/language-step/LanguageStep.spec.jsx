import { render, screen, fireEvent, within } from '@testing-library/react'

import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'

import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('Autocomplete test', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepProvider
          initialValues={initialValues}
          stepLabels={tutorStepLabels}
        >
          <LanguageStep btnsBox={btnsBox} stepLabel={'language'} />
        </StepProvider>
      </ModalProvider>
    )
  })
  it('Shoult select some data', () => {
    const autocomplete = screen.getByTestId('language')
    const input = within(autocomplete).getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'Ukraini' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
    expect(input.value).toBe('Ukrainian')
  })
  it('Should return empty string after click delete button', () => {
    const autocomplete = screen.getByTestId('language')
    const input = within(autocomplete).getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'Ukraini' } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    const buttonClear = screen.getByLabelText('Clear')
    fireEvent.click(buttonClear)

    expect(input.value).toBe('')
  })
})
