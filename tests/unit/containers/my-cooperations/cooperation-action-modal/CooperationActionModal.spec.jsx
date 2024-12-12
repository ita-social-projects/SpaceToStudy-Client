import { render, screen } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'

import CooperationActionModal from '~/containers/my-cooperations/cooperation-action-modal/CooperationActionModal'

describe('CooperationActionModal', () => {
  beforeEach(() => {
    render(
      <CooperationActionModal
        description='cooperationDetailsPage.closingMessage'
        title='titles.acceptCooperationClosing'
        children='cooperationDetailsPage.someAdditionalText'
      />
    )
  })

  it('should render the CooperationActionModal with title, description and children', () => {
    const titleText = screen.getByText('titles.acceptCooperationClosing')
    const descriptionText = screen.getByText(
      'cooperationDetailsPage.closingMessage'
    )
    const childrenContent = screen.getByText(
      'cooperationDetailsPage.someAdditionalText'
    )

    expect(titleText).toBeInTheDocument()
    expect(descriptionText).toBeInTheDocument()
    expect(childrenContent).toBeInTheDocument()
  })
})
