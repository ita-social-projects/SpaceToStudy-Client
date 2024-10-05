import { screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import ActiveStudentsBlock from '~/components/active-students/ActiveStudentsBlock'
import useAxios from '~/hooks/use-axios'

vi.mock('~/hooks/use-axios')

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

const mockedCooperations = [
  {
    _id: 'cooperation1',
    offer: {
      subject: {
        name: 'Violin'
      }
    },
    user: {
      _id: 'student1',
      firstName: 'FirstNameStudent1',
      lastName: 'LastNameStudent1',
      photo: 'Student1Photo'
    }
  },
  {
    _id: 'cooperation2',
    offer: {
      subject: {
        name: 'Piano'
      }
    },
    user: {
      _id: 'student2',
      firstName: 'FirstNameStudent2',
      lastName: 'LastNameStudent2',
      photo: 'Student2Photo'
    }
  },
  {
    _id: 'cooperation3',
    offer: {
      subject: {
        name: 'Web Development'
      }
    },
    user: {
      _id: 'student3',
      firstName: 'FirstNameStudent3',
      lastName: 'LastNameStudent3',
      photo: 'Student3Photo'
    }
  }
]

const mockedData = {
  loading: false,
  response: {
    items: mockedCooperations,
    count: 1
  },
  fetchData: vi.fn()
}

const mockedLoading = {
  loading: true,
  response: null,
  fetchData: vi.fn()
}

const noCooperationsMock = {
  loading: false,
  response: {
    items: [],
    count: 0
  },
  error: null,
  fetchData: vi.fn()
}
describe('ActiveStudentsBlock', () => {
  useAxios.mockImplementation(() => mockedData)

  it('should render active students', () => {
    renderWithProviders(<ActiveStudentsBlock />)

    for (const cooperation of mockedCooperations) {
      const fullName = screen.getByText(
        `${cooperation.user.firstName} ${cooperation.user.lastName}`
      )
      const subjectName = screen.getByText(cooperation.offer.subject.name)

      expect(fullName).toBeInTheDocument()
      expect(subjectName).toBeInTheDocument()
    }
  })

  it('should navigate to /my-cooperations on Show More button click', () => {
    renderWithProviders(<ActiveStudentsBlock />)

    const showMoreButton = screen.getByTestId('showMore')
    fireEvent.click(showMoreButton)

    waitFor(() => expect(navigateMock).toHaveBeenCalled())
  })

  it('should render Loader when loading', () => {
    useAxios.mockImplementation(() => mockedLoading)
    renderWithProviders(<ActiveStudentsBlock />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render add student button when no active cooperations available', () => {
    useAxios.mockImplementation(() => noCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)
    const addStudent = screen.getByTestId('addStudent')
    expect(addStudent).toBeInTheDocument()
  })

  it('should navigate to /categories/subjects/find-offers on add student button click', () => {
    useAxios.mockImplementation(() => noCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)

    const showMoreButton = screen.getByTestId('addStudent')
    fireEvent.click(showMoreButton)

    waitFor(() => expect(navigateMock).toHaveBeenCalled())
  })
})
