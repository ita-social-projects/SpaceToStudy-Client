import { screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { initialValues } from '~/containers/tutor-home-page/constants'
import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { renderWithProviders } from '~tests/test-utils'

const validations = {
  firstName: jest.fn(() => undefined),
  lastName: jest.fn(() => undefined),
  experience: jest.fn(() => undefined)
}

const fakeData = {
  response: ['Belgium', 'Canada'],
  fetchData: () => jest.fn().mockReturnValue(['Antwerp', 'Brussels'])
}

jest.mock('~/hooks/use-axios')

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('GeneralInfo test', () => {
  beforeEach(() => {
    renderHook(() => useForm({ initialValues, errorValues: {}, validations }))
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(
      <ModalProvider>
        <StepProvider>
          <GeneralInfo btnsBox={ btnsBox } stepLabel={ 'generalInfo' } />
        </StepProvider>
      </ModalProvider>
    )
  })

  it('should change firstName input', () => {
    const firstNameInput = screen.getByLabelText(/common.labels.firstName/i)

    fireEvent.change(firstNameInput, { target: { value: 'testName' } })

    expect(firstNameInput.value).toBe('testName')
  })

  it('should choose option in countries autocomplete', async () => {
    const countriesAutoComplete = screen.getByLabelText(/common.labels.country/i)
    const cityAutoComplete = screen.getByLabelText(/common.labels.city/i)

    fireEvent.mouseDown(countriesAutoComplete)

    const countryOption = screen.getByText('Belgium')

    fireEvent.click(countryOption)

    fireEvent.mouseDown(cityAutoComplete)

    const cityOption = await screen.findByText('Antwerp')

    fireEvent.click(cityOption)

    expect(countriesAutoComplete).toHaveAttribute('value', 'Belgium')
    expect(cityAutoComplete).toHaveAttribute('value', 'Antwerp')
  })
})
