import { fireEvent, render, screen } from '@testing-library/react'
import CourseCard from '~/components/course-card/CourseCard'

const mockedFunc = vi.fn()

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
    render(<CourseCard course={mockCourse} deleteCourse={mockedFunc} />)
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

  it('Should call delete method', () => {
    const menuBtn = screen.getByRole('button')
    fireEvent.click(menuBtn)
    const deleteCourse = screen.getByText('common.delete')
    fireEvent.click(deleteCourse)
    expect(mockedFunc).toHaveBeenCalled()
  })
})
