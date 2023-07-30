import { fireEvent, render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'

import UserTable from '~/components/user-table/UserTable'
import useAxios from '~/hooks/use-axios'
import {
  columns,
  initialFilters,
  initialSort,
  tabsInfo
} from '~/pages/tutor-table/constants'

vi.mock('~/hooks/use-axios')

const fetchDataMock = vi.fn()
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

const fakeData = {
  loading: false,
  response: { items: userDataArray, count: 0 },
  fetchData: fetchDataMock
}

describe('UserTable', () => {
  useAxios.mockImplementation(() => fakeData)

  beforeEach(() => {
    render(
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

    expect(fetchDataMock).toHaveBeenCalled()
  })

  it('should select all items after clicking on checkbox', () => {
    const checkbox = screen.getAllByRole('checkbox')
    const amountOfSelected = screen.getByTestId('amountOfSelected')

    expect(amountOfSelected).toHaveTextContent(`0 table.selected`)

    fireEvent.click(checkbox[0])

    expect(amountOfSelected).toHaveTextContent(
      `${userDataArray.length} table.selected`
    )

    expect(fetchDataMock).toHaveBeenCalled()
  })

  it('should change page from 1 to 2', () => {
    const inputField = screen.getByTestId('pagination-page-input')

    expect(inputField.value).toBe('1')

    fireEvent.change(inputField, { target: { value: 2 } })

    expect(inputField.value).toBe('2')

    const button = screen.getByText('table.go')

    fireEvent.click(button)

    const secondPageRows = screen.getByText(
      `6-10 table.of ${userDataArray.length}`
    )

    expect(secondPageRows).toBeInTheDocument()
  })
})
