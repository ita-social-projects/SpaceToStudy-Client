import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import MyCorsesCardsList from '~/containers/my-courses/my-courses-container/MyCorsesCardsList'
import { mockCourse } from '~tests/unit/pages/my-courses/MyCourses.spec.constans'

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...mockCourse,
    _id: `${index}`,
    title: index + mockCourse.title
  }))

describe('MyCorsesCardsList test', async () => {
  beforeEach(() => {
    renderWithProviders(<MyCorsesCardsList items={responseItemsMock} />)
  })

  it('renders MyCorsesCardsList with course cards', () => {
    const courseTitle = screen.getByText(`1${mockCourse.title}`)

    expect(courseTitle).toBeInTheDocument()
  })
})
