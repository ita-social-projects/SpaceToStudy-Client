import React from 'react'
import { screen } from '@testing-library/react'
import CooperationDetails from '~/containers/my-cooperations/cooperation-details/CooperationDetails'
import { renderWithProviders } from '~tests/test-utils'

describe('CooperationDetails', () => {
  it('should render details page', () => {
    renderWithProviders(<CooperationDetails />)

    const notesButton = screen.getByText('cooperationsPage.details.notes')

    expect(notesButton).toBeInTheDocument()
  })
})
