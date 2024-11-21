import { render, screen, fireEvent } from "@testing-library/react";
import {useState} from 'react';
import InputField from '~/design-system/components/input-field/InputField'

const placeholderText = 'Placeholder'
const helperText = 'Helper text'

describe('InputField ', () => {
    it('should call onChange when input value changes', () =>{
        const TestComponent = () => {
            const [value, setValue] = useState('');
            const handleChange = (e) => setValue(e.target.value);
            return (
                <InputField 
                    value={value} 
                    onChange={handleChange} 
                    placeholder={placeholderText} 
                />
            );
        };

        render(<TestComponent />);

        const input = screen.getByPlaceholderText(placeholderText)
        fireEvent.change(input, { target: { value: 'new value' } })

        expect(input.value).toBe('new value')

    })

    it('should render error state when error prop is true', () => {
        render(
            <InputField
                value=''
                error
                helperText='Error message'
                placeholder={placeholderText}
                onChange={() => {}}

            />
        )
        const errorText = screen.getByText('Error message')
        expect(errorText).toHaveClass('s2s-helper-text-error')
    })

    it('should render helper text', () => {
        render(
          <InputField
            value=""
            helperText={helperText}
            placeholder={placeholderText}
            onChange={() => {}}
          />
        )
        const helperTextElement = screen.getByText(helperText)
        expect(helperTextElement).toBeInTheDocument()
      })
})