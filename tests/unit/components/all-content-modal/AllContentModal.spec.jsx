import React from 'react'
import { render } from '@testing-library/react'

import AllContentModal from '~/components/all-content-modal/AllContentModal'

describe('AllContentModal', () => {
  it('renders the title', () => {
    const title = 'Test Modal'
    const { getByText } = render(<AllContentModal title={title} />)
    const titleElement = getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('renders the Icon if provided', () => {
    const TestIcon = () => <div data-testid='test-icon'>Icon</div>
    const { getByTestId } = render(
      <AllContentModal Icon={TestIcon} title='Test' />
    )
    const iconElement = getByTestId('test-icon')
    expect(iconElement).toBeInTheDocument()
  })

  it('renders the children', () => {
    const { getByText } = render(
      <AllContentModal title='Test'>
        <div>Child Component 1</div>
        <div>Child Component 2</div>
      </AllContentModal>
    )
    const childComponent1 = getByText('Child Component 1')
    const childComponent2 = getByText('Child Component 2')
    expect(childComponent1).toBeInTheDocument()
    expect(childComponent2).toBeInTheDocument()
  })
})
