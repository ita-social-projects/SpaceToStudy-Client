import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import CheckboxList from '~/components/checkbox-list/CheckboxList'

const mockedItemChanged = 'Beginner'

const mockedItems = ['Beginner', 'Intermediate', 'Advanced']
const mockedValue = ['Advanced']
const mockedLabels = new Map([
  ['Beginner', 'Початковий'],
  ['Intermediate', 'Середній'],
  ['Advanced', 'Високий']
])

const mockedGetCheckbox = vi.fn()

const titleId = 'checkboxes-list-title'

describe('CheckboxList component', () => {
  it('should get checked state of checkbox on click', () => {
    render(
      <CheckboxList
        items={mockedItems}
        onChange={mockedGetCheckbox}
        title='Levels'
        value={mockedValue}
      />
    )

    const checkbox = screen.getByLabelText('Beginner')
    expect(checkbox.checked).toBe(false)

    fireEvent.click(checkbox)

    expect(mockedGetCheckbox).toHaveBeenCalledWith([
      ...mockedValue,
      mockedItemChanged
    ])
  })

  it('should not render title element if no title in props was inserted', () => {
    render(
      <CheckboxList
        items={mockedItems}
        onChange={mockedGetCheckbox}
        value={mockedValue}
      />
    )

    const title = screen.queryByLabelText(titleId)

    expect(title).toBeNull()
  })

  it('should render checkbox labels correctly based on provided labels map and translation function', () => {
    render(
      <CheckboxList
        items={mockedItems}
        labels={mockedLabels}
        onChange={mockedGetCheckbox}
      />
    )

    mockedItems.forEach((item) => {
      const label = mockedLabels.get(item) || item
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })
})
