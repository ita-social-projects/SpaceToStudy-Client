import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CooperationCompletion from '~/containers/my-cooperations/cooperation-completion/CooperationCompletion'

describe('CooperationCompletion component tests', () => {
  beforeEach(() => {
    renderWithProviders(<CooperationCompletion />)
  })

  it('should render component', () => {
    const title = screen.getByText(
      'cooperationsPage.cooperationDetails.completionTitle'
    )
    const setting = screen.getByText(
      'cooperationsPage.cooperationDetails.closeCooperationTitle'
    )

    expect(title).toBeInTheDocument()
    expect(setting).toBeInTheDocument()
  })
})
