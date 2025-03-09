import { render, screen } from '@testing-library/react'
import DividerComponent from '~scss-components/divider/Divider'

describe('DividerComponent', () => {
  it('renders a linear divider with caption', () => {
    render(
      <DividerComponent
        caption='Test Caption'
        orientation='horizontal'
        textAlign='center'
        thickness='md'
        type='linear'
        variant='fullWidth'
      />
    )

    expect(screen.getByText('Test Caption')).toBeInTheDocument()

    expect(
      screen.getByText('Test Caption').closest('.s2s-divider')
    ).toHaveClass('s2s-divider-horizontal')
  })

  it('renders a linear thick divider', () => {
    render(
      <DividerComponent
        caption='Thick Divider'
        orientation='horizontal'
        textAlign='center'
        thickness='lg'
        type='linear'
        variant='fullWidth'
      />
    )

    expect(screen.getByText('Thick Divider')).toBeInTheDocument()

    const dividerElement = screen
      .getByText('Thick Divider')
      .closest('.s2s-divider')
    expect(dividerElement).toHaveClass('s2s-divider-horizontal')
  })

  it('renders an ellipse divider with small size', () => {
    const { container } = render(
      <DividerComponent
        caption=''
        orientation='horizontal'
        size='small'
        textAlign='center'
        thickness='sm'
        type='ellipse'
        variant='inset'
      />
    )

    const ellipseDivider = container.querySelector('.s2s-divider-ellipse-small')
    expect(ellipseDivider).toBeInTheDocument()
    expect(ellipseDivider).toHaveClass('s2s-divider-ellipse-small')
  })

  it('renders a vertical linear divider', () => {
    render(
      <DividerComponent
        caption='Vertical Divider'
        orientation='vertical'
        textAlign='center'
        thickness='md'
        type='linear'
        variant='middle'
      />
    )

    expect(screen.getByText('Vertical Divider')).toBeInTheDocument()

    expect(
      screen.getByText('Vertical Divider').closest('.s2s-divider')
    ).toHaveClass('s2s-divider-vertical')
  })

  it('applies custom thickness styling', () => {
    render(
      <DividerComponent
        caption='Styled Divider'
        orientation='horizontal'
        textAlign='left'
        thickness='lg'
        type='linear'
        variant='middle'
      />
    )

    const dividerElement = screen
      .getByText('Styled Divider')
      .closest('.s2s-divider')
    expect(dividerElement).toHaveClass('s2s-divider-horizontal')
  })
})
