import { renderWithProviders } from '~tests/test-utils'
import ScrollVisibilityWrapper from '~/components/scroll-visibility-wrapper/ScrollVisibilityWrapper'
import { fireEvent, screen } from '@testing-library/react'

const children = 'childrenElement'

describe('ScrollVisibilityWrapper test', () => {
  it('Should show children', () => {
    renderWithProviders(
      <ScrollVisibilityWrapper heightToShow={100} pageRef={{ current: window }}>
        {children}
      </ScrollVisibilityWrapper>
    )
    fireEvent.scroll(window, { target: { scrollTop: 120 } })
    expect(screen.getByText(children)).toBeInTheDocument()
  })
  it('Should not show children ', () => {
    renderWithProviders(
      <ScrollVisibilityWrapper heightToShow={100} pageRef={{ current: window }}>
        {children}
      </ScrollVisibilityWrapper>
    )
    fireEvent.scroll(window, { target: { scrollTop: 80 } })

    expect(screen.queryByText(children)).not.toBeInTheDocument()
  })
})
