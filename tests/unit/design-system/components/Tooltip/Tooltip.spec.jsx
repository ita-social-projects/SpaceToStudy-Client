import { render, screen } from '@testing-library/react';
import Tooltip from '~scss-components/tooltip/Tooltip';
import DoneIcon from '@mui/icons-material/Done';

describe('ToolTip Component', () => {
  test('renders text-only tooltip correctly', () => {
    render(<Tooltip variant="text" title="Tooltip Title" description="Tooltip Description" position="up" />);

    const tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip');
    expect(tooltip).toHaveClass('s2s-tooltip', 's2s-tooltip-text', 's2s-tooltip-up');
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument();
    expect(screen.getByText('Tooltip Description')).toBeInTheDocument();
  });

  test('renders icon-only tooltip correctly', () => {
    render(<Tooltip variant="icon" title="Tooltip Title" position="down" />);

    const tooltip = screen.getByTestId('tooltip-container');
    expect(tooltip).toHaveClass('s2s-tooltip', 's2s-tooltip-icon', 's2s-tooltip-down');
    const icon = screen.getByTestId('DoneIcon');
    expect(icon).toBeInTheDocument();
  });

  test('renders icon-text tooltip correctly', () => {
    render(<Tooltip variant="icon-text" title="Tooltip Title" description="Tooltip Description" position="right" />);

    const tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip');
    expect(tooltip).toHaveClass('s2s-tooltip', 's2s-tooltip-icon-text', 's2s-tooltip-right');
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument();
    expect(screen.getByText('Tooltip Description')).toBeInTheDocument();
    const icon = screen.getByTestId('DoneIcon');
    expect(icon).toBeInTheDocument();
  });

  test('applies correct position classes', () => {
    const { rerender } = render(
      <Tooltip variant="text" title="Tooltip Title" description="Tooltip Description" position="up" />
    );

    let tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip');
    expect(tooltip).toHaveClass('s2s-tooltip-up');

    rerender(
      <Tooltip variant="text" title="Tooltip Title" description="Tooltip Description" position="down" />
    );
    tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip');
    expect(tooltip).toHaveClass('s2s-tooltip-down');

    rerender(
      <Tooltip variant="text" title="Tooltip Title" description="Tooltip Description" position="left" />
    );
    tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip');
    expect(tooltip).toHaveClass('s2s-tooltip-left');

    rerender(
      <Tooltip variant="text" title="Tooltip Title" description="Tooltip Description" position="right" />
    );
    tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip');
    expect(tooltip).toHaveClass('s2s-tooltip-right');
  });

  test('renders without a description when it is not provided', () => {
    render(<Tooltip variant="text" title="Tooltip Title" position="up" />);
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Description')).not.toBeInTheDocument();
  });
});
