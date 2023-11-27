import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import MyCoursesContainer from '~/containers/my-courses/my-courses-container/MyCoursesContainer'
import { mockCourse } from '~tests/unit/pages/my-courses/MyCourses.spec.constans'

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...mockCourse,
    _id: `${index}`,
    title: index + mockCourse.title
  }))

describe('MyCoursesContainer test', async () => {
  beforeEach(() => {
    renderWithProviders(<MyCoursesContainer items={responseItemsMock} />)
  })

  it('renders MyCoursesContainer with course cards', () => {
    const courseTitle = screen.getByText(`1${mockCourse.title}`)

    expect(courseTitle).toBeInTheDocument()
  })
})
