import { screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import ActiveStudentsBlock from '~/components/active-students/ActiveStudentsBlock'
import useQuery from '~/hooks/use-query'

vi.mock('~/hooks/use-query')

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
  isLoading: false,
  data: {
    items: mockedCooperations,
    count: mockedCooperations.length
  }
}

const mockedLoading = {
  isLoading: true,
  data: null
}

const noCooperationsMock = {
  isLoading: false,
  data: {
    items: [],
    count: 0
  }
}

const errorCooperationsMock = {
  isLoading: false,
  isError: true,
  data: null,
  error: {
    code: 'not found',
    message: 'cooperation not found',
    status: '404'
  }
}

describe('ActiveStudentsBlock', () => {
  it('should render active students', () => {
    useQuery.mockReturnValue(mockedData)
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
    useQuery.mockReturnValue(mockedData)
    renderWithProviders(<ActiveStudentsBlock />)

    const showMoreButton = screen.getByTestId('showMore')
    fireEvent.click(showMoreButton)

    waitFor(() => expect(navigateMock).toHaveBeenCalled())
  })

  it('should render Loader when loading', () => {
    useQuery.mockReturnValue(mockedLoading)
    renderWithProviders(<ActiveStudentsBlock />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render add student button when no active cooperations available', () => {
    useQuery.mockReturnValue(noCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)
    const addStudent = screen.getByTestId('addStudent')
    expect(addStudent).toBeInTheDocument()
  })

  it('should navigate to /categories/subjects/find-offers on add student button click', () => {
    useQuery.mockReturnValue(noCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)

    const addStudentButton = screen.getByTestId('addStudent')
    fireEvent.click(addStudentButton)

    waitFor(() => expect(navigateMock).toHaveBeenCalled())
  })

  it('should not render on error', () => {
    useQuery.mockReturnValue(errorCooperationsMock)
    renderWithProviders(<ActiveStudentsBlock />)

    expect(screen.queryByText('activeStudents.title')).not.toBeInTheDocument()
  })
})
