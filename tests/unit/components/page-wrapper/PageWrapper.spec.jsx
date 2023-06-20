import { renderWithProviders } from '~tests/test-utils'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

describe('PageWrapper', () => {
  it('should render childrens', () => {
    const children = <div>Test children</div>
    const { getByText } = renderWithProviders(
      <PageWrapper>{children}</PageWrapper>
    )
    expect(getByText('Test children')).toBeInTheDocument()
  })
})
