import { screen, render } from '@testing-library/react'

import useAxios from '~/hooks/use-axios'
import StudentTable from '~/pages/student-table/StudentTable'

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

describe('StudentTable component', () => {
  useAxios.mockImplementation(() => mockData)

  it('should render StudentTable component', () => {
    render(<StudentTable />)

    const tabTitle = screen.getByText('userTable.studentsTab')

    expect(tabTitle).toBeInTheDocument()
  })
})
