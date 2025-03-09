import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import LinkButton from '~scss-components/link-button/LinkButton'
import {
  LinkButtonVariantEnum,
  SizeEnum
} from '~/types/common/enums/common.enums.ts'

describe('LinkButton Component', () => {
  const mockText = 'Link Button'
  const mockLink = '/test-link'
  const props = {
    variant: LinkButtonVariantEnum.Light,
    size: SizeEnum.Medium
  }

  beforeEach(() => {
    render(
      <Router>
        <LinkButton size={props.size} to={mockLink} variant={props.variant}>
          {mockText}
        </LinkButton>
      </Router>
    )
  })

  it('should have correct text', () => {
    const linkElement = screen.getByText(mockText)
    expect(linkElement).toBeInTheDocument()
  })

  it('should have correct classes', () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveClass('s2s-link-button')
    expect(linkElement).toHaveClass('s2s-link-button_light')
    expect(linkElement).toHaveClass('s2s-link-button_medium')
  })

  it('should have correct link', () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', mockLink)
  })

  it('should not have disabled class', () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).not.toHaveClass('s2s-link-button_disabled')
  })
})
