import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { styles } from '~/components/page-wrapper/PageWrapper.styles'

import { render } from '@testing-library/react'

describe('PageWrapper', () => {
  it('should render childrens', () => {
    const children = <div>Test children</div>
    const { getByText } = render(<PageWrapper>{children}</PageWrapper>)
    expect(getByText('Test children')).toBeInTheDocument()
  })

  it('should have the correct container styles', () => {
    const expectedContainerStyles = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      mb: '100px',
      mt: { xs: 0, sm: '16px' }
    }

    expect(styles.container).toEqual(expectedContainerStyles)
  })
})
