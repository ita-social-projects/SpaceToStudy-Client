import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'

import AppPopover from '~/components/app-popover/AppPopover'

const props = {
  hideElem: true,
  initialItems: <div>InitialItem</div>,
  showMoreElem: <button>Show more!</button>
}

const children = <div>childrenElement</div>

describe('AppPopover test', () => {
  beforeEach(() => {
    renderWithProviders(<AppPopover { ...props }>
      { children }
    </AppPopover>)
  })

  test('Should open popover', async () => {
    const openBtn = screen.getByText('Show more!')

    fireEvent.click(openBtn)

    const childrenElement = screen.getByText('childrenElement')
    const popoverId = screen.getByTestId('app-popover')

    expect(popoverId).toBeInTheDocument()
    expect(childrenElement).toBeInTheDocument()
  })
})
