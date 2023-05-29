import { renderWithProviders } from '~tests/test-utils'
import ScrollVisibilityWrapper from '~/components/scroll-visibility-wrapper/ScrollVisibilityWrapper'
import { fireEvent, screen, waitFor } from '@testing-library/react'

const children = 'childrenElement'

describe('ScrollVisibilityWrapper test', () => {
  it('Should show children', async () => {
    renderWithProviders(
      <ScrollVisibilityWrapper heightToShow={100} pageRef={{ current: window }}>
        {children}
      </ScrollVisibilityWrapper>
    )
    fireEvent.scroll(window, { target: { scrollTop: 120 } })
    await waitFor(() => expect(screen.getByText(children)).toBeInTheDocument())
  })
  it('Should not show children ', async () => {
    renderWithProviders(
      <ScrollVisibilityWrapper heightToShow={100} pageRef={{ current: window }}>
        {children}
      </ScrollVisibilityWrapper>
    )
    fireEvent.scroll(window, { target: { scrollTop: 80 } })
    await waitFor(() =>
      expect(screen.queryByText(children)).not.toBeInTheDocument()
    )
  })
})
