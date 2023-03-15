import { render , fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import CheckboxList from '~/components/checkbox-list/CheckboxList';

const mockedItemToChange = { title: 'Beginner', checked: false }

const mockedItems =  [ mockedItemToChange, { title: 'Intermediate', checked: false }, { title: 'Advanced', checked: false } ]

const mockedGetCheckbox = vi.fn()

describe('CheckboxList component', () => {
  it('should get checked state of checkbox on click', () => {
    const { getByLabelText } = render(<CheckboxList title='Levels' items={ mockedItems } getCheckbox={ mockedGetCheckbox }  />)
    
    const checkbox = getByLabelText('Beginner')
    expect(checkbox.checked).toBe(false)
    
    fireEvent.click(checkbox)

    expect(mockedGetCheckbox).toHaveBeenCalledWith(mockedItemToChange)
  })
})
