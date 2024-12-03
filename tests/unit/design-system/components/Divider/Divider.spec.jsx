import { render, screen } from '@testing-library/react';
import DividerComponent from '~scss-components/divider/Divider';

describe('DividerComponent', () => {
  it('renders a linear divider with caption', () => {
    render(
      <DividerComponent
        variant='fullWidth'
        orientation='horizontal'
        thickness='md'
        textAlign='center'
        caption='Test Caption'
        type='linear'
      />
    );

    expect(screen.getByText('Test Caption')).toBeInTheDocument();

    expect(screen.getByText('Test Caption').closest('.s2s-divider')).toHaveClass('s2s-divider-horizontal');
  });

  it('renders a linear thick divider', () => {
    render(
      <DividerComponent
        variant='fullWidth'
        orientation='horizontal'
        thickness='lg'
        textAlign='center'
        caption='Thick Divider'
        type='linear'
      />
    );

    expect(screen.getByText('Thick Divider')).toBeInTheDocument();

    const dividerElement = screen.getByText('Thick Divider').closest('.s2s-divider');
    expect(dividerElement).toHaveClass('s2s-divider-horizontal');
  });

  it('renders an ellipse divider with small size', () => {
    const { container } = render(
      <DividerComponent
        variant='inset'
        orientation='horizontal'
        thickness='sm'
        type='ellipse'
        size='small'
        caption=''
        textAlign='center'
      />
    );

    const ellipseDivider = container.querySelector('.s2s-divider-ellipse-small');
    expect(ellipseDivider).toBeInTheDocument();
    expect(ellipseDivider).toHaveClass('s2s-divider-ellipse-small');
  });

  it('renders a vertical linear divider', () => {
    render(
      <DividerComponent
        variant='middle'
        orientation='vertical'
        thickness='md'
        type='linear'
        caption='Vertical Divider'
        textAlign='center'
      />
    );

    expect(screen.getByText('Vertical Divider')).toBeInTheDocument();

    expect(screen.getByText('Vertical Divider').closest('.s2s-divider')).toHaveClass('s2s-divider-vertical');
  });

  it('applies custom thickness styling', () => {
    render(
      <DividerComponent
        variant='middle'
        orientation='horizontal'
        thickness='lg'
        type='linear'
        caption='Styled Divider'
        textAlign='left'
      />
    );

    const dividerElement = screen.getByText('Styled Divider').closest('.s2s-divider');
    expect(dividerElement).toHaveClass('s2s-divider-horizontal');
  });
});
