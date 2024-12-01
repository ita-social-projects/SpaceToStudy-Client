import { render, screen } from '@testing-library/react';
import RadioButton from '~scss-components/radio-button/RadioButton'

describe('RadioButton Component', () => {

    test('should render the RadioButton with default props', () => {
      render(<RadioButton label="Default Radio Button" />);
      const radioLabel = screen.getByText('Default Radio Button');
      expect(radioLabel).toBeInTheDocument();
      const radioButton = screen.getByRole('radio');
      expect(radioButton).toBeInTheDocument();
      expect(radioButton).not.toBeChecked();
    });

    test('should render the RadioButton with checked state', () => {
        render(<RadioButton label="Checked Radio Button" checked={true} />);
        const radioButton = screen.getByRole('radio');
        expect(radioButton).toBeChecked();
    });

    test('should render the RadioButton in loading state', () => {
        render(<RadioButton label="Loading Radio Button" loading={true} />);
        const loader = screen.getByRole('progressbar');
        expect(loader).toBeInTheDocument();
        const radioButton = screen.queryByRole('radio');
        expect(radioButton).not.toBeInTheDocument();
    });

    test('should render the RadioButton in disabled state', () => {
        render(<RadioButton label="Disabled Radio Button" disabled={true} />);
        const radioButton = screen.getByRole('radio');
        expect(radioButton).toBeDisabled();
    });

    test('should render with custom size (sm)', () => {
        render(<RadioButton label="Small Radio Button" size="sm" />);
        const radioButtonWrapper = screen.getByRole('radio').parentElement;
        expect(radioButtonWrapper).toHaveClass('radio-sm');
    });

    test('should render with custom color (error)', () => {
        render(<RadioButton label="Error Radio Button" color="error" />);
        const radioButton = screen.getByRole('radio');
        expect(radioButton.closest('.radio-error')).toBeInTheDocument();
    });

    test('should render with custom color (success)', () => {
        render(<RadioButton label="Success Radio Button" color="success" />);
        const radioButton = screen.getByRole('radio');
        expect(radioButton.closest('.radio-success')).toBeInTheDocument();
    });

    test('should render with custom color (primary)', () => {
        render(<RadioButton label="Primary Radio Button" color="primary" />);
        const radioButton = screen.getByRole('radio');
        expect(radioButton.closest('.radio-primary')).toBeInTheDocument();
    });

    test('should render with custom label position (top)', () => {
        render(<RadioButton label="Radio Button with Top Label" labelPosition="top" />);
        const label = screen.getByText('Radio Button with Top Label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass('MuiFormControlLabel-label');
    });

    test('should render with custom label position (bottom)', () => {
        render(<RadioButton label="Radio Button with Bottom Label" labelPosition="bottom" />);
        const label = screen.getByText('Radio Button with Bottom Label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass('MuiFormControlLabel-label');
    });

    test('should render with custom label position (end)', () => {
        render(<RadioButton label="Radio Button with End Label" labelPosition="end" />);
        const label = screen.getByText('Radio Button with End Label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass('MuiFormControlLabel-label');
    });

    test('should apply the correct class when checked', () => {
        render(<RadioButton label="Checked Radio Button" checked={true} />);
        const radioButton = screen.getByRole('radio');
        expect(radioButton.closest('.radio-checked')).toBeInTheDocument();
    });
});