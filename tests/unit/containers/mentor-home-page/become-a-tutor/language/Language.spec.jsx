import { render, screen, fireEvent, within } from '@testing-library/react'
import Language from '~/containers/tutor-home-page/language/Language'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'

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
        <StepProvider>
          <Language btnsBox={ btnsBox } stepLabel={ 'language' } />
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
