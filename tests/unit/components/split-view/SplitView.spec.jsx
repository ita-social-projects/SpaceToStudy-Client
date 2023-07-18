import { render, screen } from '@testing-library/react'
import SplitView from '~/components/split-view/SplitView'

describe('SplitView', () => {
  it('renders left and right panes correctly', () => {
    render(
      <SplitView left={<div>Left Pane</div>} right={<div>Right Pane</div>} />
    )
    const leftPane = screen.getByText('Left Pane')
    const rightPane = screen.getByText('Right Pane')

    expect(leftPane).toBeInTheDocument()
    expect(rightPane).toBeInTheDocument()
  })

  it('hides left pane if isHideLeft prop is true', () => {
    render(
      <SplitView
        isHideLeft
        left={<div>Left Pane</div>}
        right={<div>Right Pane</div>}
      />
    )

    const leftPane = screen.queryByText('Left Pane')
    const rightPane = screen.getByText('Right Pane')

    expect(leftPane).toBeNull()
    expect(rightPane).toBeInTheDocument()
  })

  it('hides right pane if isHideRight prop is true', () => {
    render(
      <SplitView
        isHideRight
        left={<div>Left Pane</div>}
        right={<div>Right Pane</div>}
      />
    )

    const leftPane = screen.getByText('Left Pane')
    const rightPane = screen.queryByText('Right Pane')

    expect(leftPane).toBeInTheDocument()
    expect(rightPane).toBeNull()
  })
})
