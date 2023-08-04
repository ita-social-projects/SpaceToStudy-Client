import { screen } from '@testing-library/react'

import useAxios from '~/hooks/use-axios'
import TutorTable from '~/pages/tutor-table/TutorTable'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/hooks/use-axios')

const userDataMock = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  status: {
    tutor: 'active'
  }
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...userDataMock,
    _id: `${index}`
  }))

const mockData = {
  loading: false,
  response: { items: responseItemsMock, count: 10 },
  fetchData: vi.fn()
}

describe('TutorTable component', () => {
  useAxios.mockImplementation(() => mockData)

  it('should render TutorTable component', () => {
    renderWithProviders(<TutorTable />)

    const tabTitle = screen.getByText('userTable.tutorsTab')

    expect(tabTitle).toBeInTheDocument()
  })
})
