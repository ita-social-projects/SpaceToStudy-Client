import { vi } from 'vitest'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { StepProvider } from '~/context/step-context'

import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { URLs } from '~/constants/request'

const setIsUserFetched = vi.fn()

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
    await waitFor(() => {
      mockAxiosClient
        .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
        .reply(200, userDataMock)
      mockAxiosClient
        .onGet(URLs.location.getCountries)
        .reply(200, countriesDataMock)
      mockAxiosClient
        .onGet(`${URLs.location.getCities}/${country}`)
        .reply(200, citiesDataMock)
      renderWithProviders(
        <StepProvider
          initialValues={initialValues}
          stepLabels={tutorStepLabels}
        >
          <GeneralInfoStep
            btnsBox={btnsBox}
            isUserFetched={false}
            setIsUserFetched={setIsUserFetched}
            stepLabel={'generalInfo'}
          />
        </StepProvider>,
        { preloadedState: mockState }
      )
    })
  })

  it('should change firstName input', () => {
    const firstNameInput = screen.getByLabelText(/common.labels.firstName/i)

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'testName' } })
    })

    expect(firstNameInput.value).toBe('testName')
  })

  it('should choose option in countries autocomplete', () => {
    const countriesAutoComplete = screen.getByLabelText(
      /common.labels.country/i
    )

    act(() => {
      fireEvent.click(countriesAutoComplete)
      fireEvent.change(countriesAutoComplete, {
        target: { value: 'Belgium' }
      })
      fireEvent.keyDown(countriesAutoComplete, { key: 'ArrowDown' })
      fireEvent.keyDown(countriesAutoComplete, { key: 'Enter' })
    })

    waitFor(() => {
      expect(countriesAutoComplete.value).toBe('Belgium')
    })
  })
})
