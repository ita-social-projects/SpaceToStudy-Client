import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
  const onChangeMock = vi.fn()

  afterEach(() => {
    onChangeMock.mockClear()
  })

  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        isStudent
        onChange={onChangeMock}
        switchOptions={testSwitchOptions}
        typographyVariant='h6'
      />
    )

    expect(screen.getByText('Left Text')).toBeInTheDocument()
    expect(screen.getByText('Right Text')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
    const { getByRole } = render(
      <AppContentSwitcher
        isStudent
        onChange={onChangeMock}
        switchOptions={testSwitchOptions}
        typographyVariant='h6'
      />
    )

    waitFor(() => getByRole('checkbox').click())

    expect(onChangeMock).toHaveBeenCalled()
  })

  it('renders tooltips when tooltip props are passed', async () => {
    render(
      <AppContentSwitcher
        isStudent
        onChange={onChangeMock}
        switchOptions={testSwitchOptions}
        typographyVariant='h6'
      />
    )

    waitFor(() => {
      fireEvent.mouseOver(screen.getByText('Left Text'))
    })

    const lTooltip = await screen.findByText('Left Tooltip')

    expect(lTooltip).toBeInTheDocument()

    waitFor(() => {
      fireEvent.mouseOver(screen.getByText('Right Text'))
    })

    const rTooltip = await screen.findByText('Right Tooltip')

    expect(rTooltip).toBeInTheDocument()
  })
})
