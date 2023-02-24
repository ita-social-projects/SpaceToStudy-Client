import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { initialValues } from '~/containers/tutor-home-page/constants'
import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import { axiosClient } from '~/plugins/axiosClient'
import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'
import useForm from '~/hooks/use-form'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'

const mockAxiosClient = new MockAdapter(axiosClient)

const setIsUserFetched = vi.fn()

const validations = {
  firstName: vi.fn(() => undefined),
  lastName: vi.fn(() => undefined),
  experience: vi.fn(() => undefined)
}

const userId = '63f5d0ebb'
const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }
const countriesDataMock = ['Ukraine', 'Belgium']
const citiesDataMock = ['Antwerp', 'Brussels']
const country = 'Belgium'

const mockState = {
  appMain: { userId, loading: false }
}

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('GeneralInfo test', () => {
  beforeEach(async () => {
    renderHook(() => useForm({ initialValues, errorValues: {}, validations }))

    mockAxiosClient.onGet(`${URLs.users.get}/${userId}`).reply(200, { data: userDataMock })
    mockAxiosClient.onGet(URLs.location.getCountries).reply(200, countriesDataMock)
    mockAxiosClient.onGet(`${URLs.location.getCities}/${country}`).reply(200, citiesDataMock)

    await waitFor(() => {
      renderWithProviders(
        <ModalProvider>
          <StepProvider>
            <GeneralInfo
              btnsBox={ btnsBox }
              isUserFetched
              setIsUserFetched={ setIsUserFetched }
              stepLabel={ 'generalInfo' }
            />
          </StepProvider>
        </ModalProvider>,
        { preloadedState: mockState }
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
