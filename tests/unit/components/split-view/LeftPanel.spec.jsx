import { render, screen } from '@testing-library/react'
import LeftPanel from '~/components/split-view/LeftPanel'

const setLeftWidthMock = vi.fn()
const childrenText = 'Hello, World!'
const leftWidth = 200

describe('LeftPanel', () => {
  it('renders children and sets width correctly', () => {
    render(
      <LeftPanel leftWidth={leftWidth} setLeftWidth={setLeftWidthMock}>
        {childrenText}
      </LeftPanel>
    )

    const childrenElement = screen.getByText(childrenText)
    expect(childrenElement).toBeInTheDocument()

    const leftPanelElement = screen.getByTestId('leftPanel')
    expect(leftPanelElement).toHaveStyle(`width: ${leftWidth}px`)

    render(
      <LeftPanel leftWidth={undefined} setLeftWidth={setLeftWidthMock}>
        {childrenText}
      </LeftPanel>
    )
    expect(setLeftWidthMock).toHaveBeenCalledWith(leftPanelElement.clientWidth)
  })
})
