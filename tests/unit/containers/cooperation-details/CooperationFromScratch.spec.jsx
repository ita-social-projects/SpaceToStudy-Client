import { screen } from '@testing-library/react'
import CooperationFromScratch from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch'

import { renderWithProviders } from '~tests/test-utils'

describe('Cooperation from scratch', () => {
  it('should render cooperation from scratch page', () => {
    renderWithProviders(<CooperationFromScratch />)

    const resourcesDescription = screen.getByText(
      'cooperationDetailsPage.allResources'
    )

    expect(resourcesDescription).toBeInTheDocument()
  })
})
