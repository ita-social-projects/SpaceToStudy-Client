import { screen, fireEvent, act, waitFor } from '@testing-library/react'
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

  it('should change firstName input', async () => {
    const firstNameInput = await screen.findByLabelText(/common.labels.firstName/i)

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'testName' } })
    })

    expect(firstNameInput.value).toBe('testName')
  })

  it('should choose option in countries autocomplete', async () => {
    const countriesAutoComplete = await screen.findByLabelText(/common.labels.country/i)
    const cityAutoComplete = await screen.findByLabelText(/common.labels.city/i)

    act(() => {
      fireEvent.mouseDown(countriesAutoComplete)
    })

    const countryOption = await screen.findByText('Belgium')

    act(() => {
      fireEvent.click(countryOption)
    })

    act(() => {
      fireEvent.mouseDown(cityAutoComplete)
    })

    const cityOption = await screen.findByText('Antwerp')

    act(() => {
      fireEvent.click(cityOption)
    })

    await waitFor(() => {
      expect(countriesAutoComplete).toHaveAttribute('value', 'Belgium')
      expect(cityAutoComplete).toHaveAttribute('value', 'Antwerp')
    })
  })
})
