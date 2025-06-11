import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { mockedCooperations } from '~tests/test-constants'
import { URLs } from '~/constants/request'

import MyCooperations from '~/pages/my-cooperations/MyCooperations'

describe('MyCooperations', () => {
  beforeAll(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.cooperations.get))
      .reply(200, mockedCooperations)
  })

  beforeEach(() => {
    renderWithProviders(<MyCooperations />)
  })

  it('should render title on page', async () => {
    const title = screen.getByText('cooperationsPage.title')

    expect(title).toBeInTheDocument()
  })

  it('should render opposite user name on cooperation card', async () => {
    const activeTab = screen.getByText('Jane Doe')

    expect(activeTab).toBeInTheDocument()
  })

  it('should change tab', () => {
    const activeTab = screen.getByText('cooperationsPage.tabs.active')

    fireEvent.click(activeTab)

    const coopCard = screen.queryAllByText('Beginner')

    expect(coopCard.length).toBe(0)
  })
})
