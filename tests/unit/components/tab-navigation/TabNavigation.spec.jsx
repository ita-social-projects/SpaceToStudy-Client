import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TabNavigation from '~/components/tab-navigation/TabNavigation'

describe('TabNavigation', () => {
  const tabsData = {
    tab1: {
      title: 'Tab 1',
      content: <div>Tab 1 Content</div>,
      icon: <span>Icon 1</span>
    },
    tab2: {
      title: 'Tab 2',
      content: <div>Tab 2 Content</div>,
      icon: <span>Icon 2</span>
    }
  }

  it('renders TabNavigation correctly', () => {
    const { getByText } = render(
      <TabNavigation
        activeTab='tab1'
        handleClick={() => {}}
        tabsData={tabsData}
      />
    )

    expect(getByText('Tab 1')).toBeInTheDocument()
    expect(getByText('Tab 2')).toBeInTheDocument()
    expect(getByText('Icon 1')).toBeInTheDocument()
    expect(getByText('Icon 2')).toBeInTheDocument()
  })

  it('calls handleClick when a tab is clicked', () => {
    const handleClick = vi.fn()
    const { getByText } = render(
      <TabNavigation
        activeTab='tab1'
        handleClick={handleClick}
        tabsData={tabsData}
      />
    )

    fireEvent.click(getByText('Tab 2'))
    expect(handleClick).toHaveBeenCalledWith('tab2')
  })
})
