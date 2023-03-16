import { render , fireEvent, screen } from '@testing-library/react'
<<<<<<< HEAD
import { vi, expect } from 'vitest'
import CheckboxList from '~/components/checkbox-list/CheckboxList'

const mockedItemToChange = { title: 'Beginner', checked: false }
const mockedItemChanged = { ...mockedItemToChange, checked: true }

const mockedItems =  [ { title: 'Intermediate', checked: false }, { title: 'Advanced', checked: false } ]
=======
import { vi } from 'vitest'
import CheckboxList from '~/components/checkbox-list/CheckboxList'

const mockedItemToChange = { title: 'Beginner', checked: false }

const mockedItems =  [ mockedItemToChange, { title: 'Intermediate', checked: false }, { title: 'Advanced', checked: false } ]
>>>>>>> f086cc4 (updated AppSelect component to tsx and added som unit tests)

const mockedGetCheckbox = vi.fn()

const titleId = 'checkboxes-list-title'

describe('CheckboxList component', () => {
  it('should get checked state of checkbox on click', () => {
<<<<<<< HEAD
    render(<CheckboxList getCheckboxes={ mockedGetCheckbox } items={ [ mockedItemToChange,...mockedItems] } title='Levels'  />)
=======
    render(<CheckboxList getCheckboxes={ mockedGetCheckbox } items={ mockedItems } title='Levels'  />)
>>>>>>> f086cc4 (updated AppSelect component to tsx and added som unit tests)
    
    const checkbox = screen.getByLabelText('Beginner')
    expect(checkbox.checked).toBe(false)
    
    fireEvent.click(checkbox)

<<<<<<< HEAD
    expect(mockedGetCheckbox).toHaveBeenCalledWith([mockedItemChanged, ...mockedItems])
=======
    expect(mockedGetCheckbox).toHaveBeenCalledWith(mockedItems)
>>>>>>> f086cc4 (updated AppSelect component to tsx and added som unit tests)
  })
  it('should not render title element if no title in props was inserted', () => {
    render(<CheckboxList getCheckboxes={ mockedGetCheckbox } items={ mockedItems } />)
    
    const title = screen.queryByLabelText(titleId)
<<<<<<< HEAD
=======
    console.log(title)
>>>>>>> f086cc4 (updated AppSelect component to tsx and added som unit tests)

    expect(title).toBeNull()
  })
})
