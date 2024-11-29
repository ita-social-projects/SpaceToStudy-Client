import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from '~/design-system/components/icon-button/IconButton';
import { IconButtonVariant } from '~/types';
import { vi } from 'vitest'

describe('IconButton Component', () => {
  test('renders correctly with default props', () => {
    render(<IconButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('s2s-icon-button--md');
    expect(button).toHaveClass('s2s-icon-button--primary');
    expect(button).not.toBeDisabled();
    expect(screen.getByTestId('AddRoundedIcon')).toBeInTheDocument();
  });

  test('applies the correct size class', () => {
    render(<IconButton size="lg" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('s2s-icon-button--lg');
  });

  test('applies the correct variant class', () => {
    render(<IconButton variant={IconButtonVariant.Success} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('s2s-icon-button--success');
  });

  test('disables the button when loading is true', () => {
    render(<IconButton loading />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('disables the button when disabled is true', () => {
    render(<IconButton disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('toggles the state when toggleAble is true', () => {
    render(<IconButton toggleAble />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('s2s-icon-button--primary');
    fireEvent.click(button);
    expect(button).toHaveClass('s2s-icon-button--primary-toggle-able');

    fireEvent.click(button);
    expect(button).toHaveClass('s2s-icon-button--primary');
  });

  test('does not toggle when toggleAble is false', () => {
    render(<IconButton />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('s2s-icon-button--primary');

    fireEvent.click(button);
    expect(button).toHaveClass('s2s-icon-button--primary');
  });


  test('calls onClick prop when clicked', () => {
    const handleClick = vi.fn();
    render(<IconButton onClick={handleClick} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<IconButton onClick={handleClick} disabled />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
