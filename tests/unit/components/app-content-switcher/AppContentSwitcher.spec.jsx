import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const testSwitchOptions = {
  left: {
    text: 'Left Text',
    tooltip: 'Left Tooltip'
  },
  right: {
    text: 'Right Text',
    tooltip: 'Right Tooltip'
  }
}

describe('test AppContentSwitcher component', () => {
  const handleChangeMock = vi.fn()

  afterEach(() => {
    handleChangeMock.mockClear()
  })

  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        handleChange={ handleChangeMock }
        isStudent
        switchOptions={ testSwitchOptions }
        typographyVariant="h6"
      />
    )

    expect(screen.getByText('Left Text')).toBeInTheDocument()
    expect(screen.getByText('Right Text')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the handleChange function when the switch is clicked', () => {
    const { getByRole } = render(
      <AppContentSwitcher
        handleChange={ handleChangeMock }
        isStudent
        switchOptions={ testSwitchOptions }
        typographyVariant="h6"
      />
    )

    getByRole('checkbox').click()

    expect(handleChangeMock).toHaveBeenCalled()
  })

  it('renders tooltips when tooltip props are passed', async () => {
    render(
      <AppContentSwitcher
        handleChange={ handleChangeMock }
        isStudent
        switchOptions={ testSwitchOptions }
        typographyVariant="h6"
      />
    )

    fireEvent.mouseOver(screen.getByText('Left Text'))
    const lTooltip = await screen.findByText('Left Tooltip')
    expect(lTooltip).toBeInTheDocument()

    fireEvent.mouseOver(screen.getByText('Right Text'))
    const rTooltip = await screen.findByText('Right Tooltip')
    expect(rTooltip).toBeInTheDocument()
  })

})
