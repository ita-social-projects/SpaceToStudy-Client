import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { render } from '@testing-library/react'

describe('PageWrapper', () => {
  it('should render childrens', () => {
    const children = <div>Test children</div>
    const { getByText } = render(<PageWrapper>{children}</PageWrapper>)
    expect(getByText('Test children')).toBeInTheDocument()
  })
})
