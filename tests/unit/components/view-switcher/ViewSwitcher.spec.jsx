import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { cardsViews } from '~/constants'

const mockedOnChange = vi.fn()

describe('ViewSwitcher component', () => {
  it('should change view to inline on click', () => {
    render(<ViewSwitcher onChange={ mockedOnChange } value={ cardsViews.inline } />)
    
    const mockedInlineViewButton = screen.getByLabelText('inline card view')
    fireEvent.click(mockedInlineViewButton)
    
    expect(mockedOnChange).toHaveBeenCalledWith(cardsViews.inline)
  })
  it('should change view to grid on click', () => {
    render(<ViewSwitcher onChange={ mockedOnChange } value={ cardsViews.grid } />)
    
    const mockedInlineViewButton = screen.getByLabelText('grid card view')
    fireEvent.click(mockedInlineViewButton)
    
    expect(mockedOnChange).toHaveBeenCalledWith(cardsViews.grid)
  })
})
