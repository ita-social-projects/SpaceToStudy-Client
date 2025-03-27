import { vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'

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
const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }
const countriesDataMock = [
  { name: 'Ukraine', iso2: 'UA' },
  { name: 'Belgium', iso2: 'BE' }
]
const citiesDataMock = ['Antwerp', 'Brussels']

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
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.users.getUserById.replace(':id', userId)))
      .reply(200, userDataMock)
    mockAxiosClient
      .onGet(URLs.location.getCountries)
      .reply(200, countriesDataMock)
    mockAxiosClient
      .onGet(
        new RegExp(
          URLs.location.getCitiesByCountryName.replace(':countryName', '')
        )
      )
      .reply(200, citiesDataMock)
    renderWithProviders(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
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

  it('should change firstName input', async () => {
    const firstNameInput = await screen.findByLabelText(
      /common.labels.firstName/i
    )
    fireEvent.change(firstNameInput, { target: { value: 'testName' } })

    expect(firstNameInput.value).toBe('testName')
  })

  it('should choose option in countries autocomplete', async () => {
    const countriesAutoComplete = await screen.findByLabelText(
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
