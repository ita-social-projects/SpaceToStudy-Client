import { fireEvent, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'

import UserTable from '~/components/user-table/UserTable'
import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/tutor-table/constants'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const userRole = 'tutor'

const userDataMock = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  status: {
    tutor: 'active'
  }
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const userDataArray = Array(10)
  .fill()
  .map((_, index) => ({
    ...userDataMock,
    _id: `${index}`
  }))

describe('UserTable', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.users.get))
      .reply(200, { items: userDataArray, count: userDataArray.length })

    renderWithProviders(
      <UserTable
        columns={columns}
        initialFilters={initialFilters}
        initialSort={initialSort}
        role={userRole}
        tabsInfo={tabsInfo}
      />
    )
  })

  it('should render page title', () => {
    const title = screen.getByText('userTable.tutorsTab')

    expect(title).toBeInTheDocument()
  })

  it('should change tab', () => {
    const tab = screen.getByText('userTable.active')

    fireEvent.click(tab)
  })

  it('should select all items after clicking on checkbox', () => {
    const checkbox = screen.getAllByRole('checkbox')
    const amountOfSelected = screen.getByTestId('amountOfSelected')

    expect(amountOfSelected).toHaveTextContent(`0 table.selected`)

    fireEvent.click(checkbox[0])

    expect(amountOfSelected).toHaveTextContent(
      `${userDataArray.length} table.selected`
    )
  })

  it('should change page from 1 to 2', async () => {
    const inputField = screen.getByTestId('pagination-page-input')

    expect(inputField.value).toBe('1')

    fireEvent.change(inputField, { target: { value: 2 } })

    expect(inputField.value).toBe('2')

    const button = screen.getByText('table.go')

    fireEvent.click(button)

    const secondPageRows = await screen.findByText(
      `6-10 table.of ${userDataArray.length}`
    )

    expect(secondPageRows).toBeInTheDocument()
  })
})
