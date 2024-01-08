import React from 'react'
import { screen } from '@testing-library/react'
import CooperationDetails from '~/containers/my-cooperations/cooperation-details/CooperationDetails'
import { renderWithProviders } from '~tests/test-utils'

describe('CooperationDetails', () => {
  it('should render details page', () => {
    renderWithProviders(<CooperationDetails />)
    const level = screen.getByText('breadCrumbs.cooperationDetails')

    expect(level).toBeInTheDocument()
  })
})
