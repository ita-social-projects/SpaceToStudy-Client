import { render, screen } from '@testing-library/react'
import StudentHome from '~/pages/student-home/StudentHome'
import { MemoryRouter } from 'react-router-dom'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')

const mockCategoriesNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]

describe('StudentHome', () => {
  it('should render correctly', async () => {
    render(
      <MemoryRouter>
        <StudentHome />
      </MemoryRouter>
    )
    categoryService.getCategories.mockResolvedValueOnce({ data: mockCategoriesNames })

    expect(screen.getByTestId('studentHome')).toBeInTheDocument()

    expect(screen.getByText('studentHomePage.findTutorBlock.title')).toBeInTheDocument()
    expect(screen.getByText('studentHomePage.popularCategories.title')).toBeInTheDocument()
  })
})
