import { fireEvent, render, screen } from '@testing-library/react'
import CourseCard from '~/components/course-card/CourseCard'

const deleteCourseMock = vi.fn()
const duplicateCourseMock = vi.fn()

const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedUseNavigate
}))

describe('CourseCard', () => {
  const mockCourse = {
    proficiencyLevel: ['Beginner'],
    title: 'Advanced Lineal Math: Theoretical Concepts',
    description: 'The mathematical language of quantum mechanics',
    languages: ['English'],
    subject: {
      _id: '648850c4fdc2d1a130c24aea',
      name: 'Quantum Mechanics'
    },
    category: {
      _id: '64884f21fdc2d1a130c24ac0',
      appearance: {
        icon: 'mocked-path-to-icon',
        color: '#66C42C'
      }
    },
    sections: [{}, {}, {}],
    createdAt: '2023-09-19T12:12:25.098Z',
    updatedAt: '2023-09-19T12:17:10.447Z'
  }

  beforeEach(() => {
    render(
      <CourseCard
        course={mockCourse}
        deleteCourse={deleteCourseMock}
        duplicateCourse={duplicateCourseMock}
      />
    )
  })

  it('Should render title and description of component ', () => {
    const title = screen.getByText('Advanced Lineal Math: Theoretical Concepts')
    const description = screen.getByText(
      'The mathematical language of quantum mechanics'
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('Should render sum of sections', () => {
    const sections = screen.getByText('3 course.sections')

    expect(sections).toBeInTheDocument()
  })

  it('Should render course menu', () => {
    const menuBtn = screen.getByRole('button')
    fireEvent.click(menuBtn)
    const menu = screen.getByRole('menu')

    expect(menu).toBeInTheDocument()
  })

  it('Should call duplicate method', () => {
    const menuBtn = screen.getByRole('button')
    fireEvent.click(menuBtn)
    const duplicateCourse = screen.getByText('common.duplicate')
    fireEvent.click(duplicateCourse)
    expect(duplicateCourseMock).toHaveBeenCalled()
  })

  it('Should call delete method', () => {
    const menuBtn = screen.getByRole('button')
    fireEvent.click(menuBtn)
    const deleteCourse = screen.getByText('common.delete')
    fireEvent.click(deleteCourse)
    expect(deleteCourseMock).toHaveBeenCalled()
  })

  it('Should call edit method', () => {
    const menuBtn = screen.getByRole('button')
    fireEvent.click(menuBtn)
    const editCourse = screen.getByText('common.edit')
    fireEvent.click(editCourse)
    expect(mockedUseNavigate).toHaveBeenCalled()
  })
})
