import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { initialValues } from '~/containers/tutor-home-page/constants'
import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import { axiosClient } from '~/plugins/axiosClient'
import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

const mockAxiosClient = new MockAdapter(axiosClient)

const validations = {
  firstName: vi.fn(() => undefined),
  lastName: vi.fn(() => undefined),
  experience: vi.fn(() => undefined)
}

const countriesDataMock = ['Ukraine', 'Belgium']
const citiesDataMock = ['Antwerp', 'Brussels']
const country = 'Belgium'

const getCountriesMock = vi.fn(() => ['Ukraine', 'Belgium'])
const getCitiesMock = vi.fn(() => ['Antwerp', 'Brussels'])

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('GeneralInfo test', () => {
  beforeEach(async () => {
    mockAxiosClient.onGet(URLs.location.getCountries).reply(200, countriesDataMock)
    mockAxiosClient.onGet(`${URLs.location.getCities}/${country}`).reply(200, citiesDataMock)

    renderHook(() => useForm({ initialValues, errorValues: {}, validations }))
    renderHook(() => useAxios({ service: getCountriesMock }))
    renderHook(() => useAxios({ service: getCitiesMock, fetchOnMount: false }))

    await waitFor(() => {
      renderWithProviders(
        <ModalProvider>
          <StepProvider>
            <GeneralInfo btnsBox={ btnsBox } stepLabel={ 'generalInfo' } />
          </StepProvider>
        </ModalProvider>
      )
    })
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
