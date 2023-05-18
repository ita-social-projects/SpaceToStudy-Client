import { vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { axiosClient } from '~/plugins/axiosClient'
import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'
import useForm from '~/hooks/use-form'

import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { URLs } from '~/constants/request'

const mockAxiosClient = new MockAdapter(axiosClient)

const setIsUserFetched = vi.fn()

const validations = {
  firstName: vi.fn(() => undefined),
  lastName: vi.fn(() => undefined),
  professionalSummary: vi.fn(() => undefined)
}

const userId = '63f5d0ebb'
const userRole = 'tutor'
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

describe('GeneralInfoStep test', () => {
  beforeEach(async () => {
    renderHook(() => useForm({ initialValues, errorValues: {}, validations }))

    mockAxiosClient
      .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
      .reply(200, { data: userDataMock })
    mockAxiosClient
      .onGet(URLs.location.getCountries)
      .reply(200, countriesDataMock)
    mockAxiosClient
      .onGet(`${URLs.location.getCities}/${country}`)
      .reply(200, citiesDataMock)

    await waitFor(() => {
      renderWithProviders(
        <ModalProvider>
          <StepProvider
            initialValues={initialValues}
            stepLabels={tutorStepLabels}
          >
            <GeneralInfoStep
              btnsBox={btnsBox}
              isUserFetched
              setIsUserFetched={setIsUserFetched}
              stepLabel={'generalInfo'}
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

  it('should choose option in countries autocomplete', () => {
    const countriesAutoComplete = screen.getByLabelText(
      /common.labels.country/i
    )

    fireEvent.click(countriesAutoComplete)
    fireEvent.change(countriesAutoComplete, {
      target: { value: 'Belgium' }
    })
    fireEvent.keyDown(countriesAutoComplete, { key: 'ArrowDown' })
    fireEvent.keyDown(countriesAutoComplete, { key: 'Enter' })

    expect(countriesAutoComplete.value).toBe('Belgium')
  })
})
