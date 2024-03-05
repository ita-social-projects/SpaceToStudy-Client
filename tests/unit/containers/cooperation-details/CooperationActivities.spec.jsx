import { screen } from '@testing-library/react'
import CooperationActivities from '~/containers/cooperation-details/cooperation-activities/CooperationActivities'

import { renderWithProviders } from '~tests/test-utils'

describe('Cooperation from scratch', () => {
  it('should render cooperation from scratch page', () => {
    renderWithProviders(<CooperationActivities />)

    const scratchContainer = screen.getByTestId('coop-from-scratch')

    expect(scratchContainer).toBeInTheDocument()
  })
})
