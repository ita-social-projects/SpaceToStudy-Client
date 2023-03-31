import { render , fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CheckboxList from '~/components/checkbox-list/CheckboxList'

const mockedItemToChange = { title: 'Beginner', checked: false }
const mockedItemChanged = { ...mockedItemToChange, checked: true }

const mockedItems =  [ { title: 'Intermediate', checked: false }, { title: 'Advanced', checked: false } ]

const mockedGetCheckbox = vi.fn()

const titleId = 'checkboxes-list-title'

describe('CheckboxList component', () => {
  it('should get checked state of checkbox on click', () => {
    render(<CheckboxList getCheckboxes={ mockedGetCheckbox } items={ [ mockedItemToChange,...mockedItems] } title='Levels'  />)
    
    const checkbox = screen.getByLabelText('Beginner')
    expect(checkbox.checked).toBe(false)
    
    fireEvent.click(checkbox)

    expect(mockedGetCheckbox).toHaveBeenCalledWith([mockedItemChanged, ...mockedItems])
  })
  it('should not render title element if no title in props was inserted', () => {
    render(<CheckboxList getCheckboxes={ mockedGetCheckbox } items={ mockedItems } />)
    
    const title = screen.queryByLabelText(titleId)

    expect(title).toBeNull()
  })
})
