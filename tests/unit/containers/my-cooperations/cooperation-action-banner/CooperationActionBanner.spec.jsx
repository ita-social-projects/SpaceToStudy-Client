import { ErrorOutlineRounded } from '@mui/icons-material'
import { render, screen } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'

import CooperationActionBanner from '~/containers/my-cooperations/cooperation-action-banner/CooperationActionBanner'

describe('CooperationActionBanner', () => {
  beforeEach(() => {
    render(
      <CooperationActionBanner
        description='cooperationDetailsPage.closingMessage'
        title='titles.acceptCooperationClosing'
        children='cooperationDetailsPage.someAdditionalText'
        icon={<ErrorOutlineRounded data-testid='icon-example' />}
      />
    )
  })

  it('should render the CooperationActionBanner with title, description, icon and children', () => {
    const titleText = screen.getByText('titles.acceptCooperationClosing')
    const descriptionText = screen.getByText(
      'cooperationDetailsPage.closingMessage'
    )
    const childrenContent = screen.getByText(
      'cooperationDetailsPage.someAdditionalText'
    )
    const icon = screen.getByTestId('icon-example')

    expect(titleText).toBeInTheDocument()
    expect(descriptionText).toBeInTheDocument()
    expect(childrenContent).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })
})
