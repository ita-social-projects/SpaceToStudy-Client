import React from 'react'
import { screen } from '@testing-library/react'
import CooperationFromScratch from '~/containers/cooperation-details/cooperation-from-scratch/CooperationFromScratch'

import { renderWithProviders } from '~tests/test-utils'

describe('CooperationDetails', () => {
  it('should render details page', () => {
    renderWithProviders(<CooperationFromScratch />)

    const resourcesDescription = screen.getByText(
      'cooperationDetailsPage.allResources'
    )

    expect(resourcesDescription).toBeInTheDocument()
  })
})
