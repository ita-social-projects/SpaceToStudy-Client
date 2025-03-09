import { screen } from '@testing-library/react'
import DirectionLink from '~/components/direction-link/DirectionLink'
import { renderWithProviders } from '~tests/test-utils'

const linkTo = '/'
const title = 'Home'
const before = <span>Before text</span>
const after = <span>After text</span>

describe('DirectionLink', () => {
  beforeEach(() => {
    renderWithProviders(
      <DirectionLink
        after={after}
        before={before}
        linkTo={linkTo}
        title={title}
      />
    )
  })
  it('renders the link with the provided text', () => {
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('renders the before and after text', () => {
    expect(screen.getByText('Before text')).toBeInTheDocument()
    expect(screen.getByText('After text')).toBeInTheDocument()
  })

  it('renders the link with the provided href', () => {
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
