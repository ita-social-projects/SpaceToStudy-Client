import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { cardsViews } from '~/constants'

const mockedSetOffersView = vi.fn()

describe('ViewSwitcher component', () => {
  it('should change view to inline on click', () => {
    render(<ViewSwitcher offersView={ cardsViews.inline } setOffersView={ mockedSetOffersView } />)
    const mockedInlineViewButton = screen.getByLabelText('inline card view')
    fireEvent.click(mockedInlineViewButton)
    expect(mockedSetOffersView).toHaveBeenCalledWith(cardsViews.inline)
  })
  it('should change view to grid on click', () => {
    render(<ViewSwitcher offersView={ cardsViews.grid } setOffersView={ mockedSetOffersView } />)
    const mockedInlineViewButton = screen.getByLabelText('grid card view')
    fireEvent.click(mockedInlineViewButton)
    expect(mockedSetOffersView).toHaveBeenCalledWith(cardsViews.grid)
  })
})
