import { fireEvent, render, screen } from '@testing-library/react'
import ProfessionalCategoryList from '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList'

vi.mock(
  '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory',
  () => ({
    default: ({ handleDelete }) => (
      <div data-testid='professional-category'>
        <button data-testid='delete' onClick={handleDelete} />
      </div>
    )
  })
)

const mockItems = [
  {
    _id: '1',
    category: { _id: 'Category 1', name: 'Category 1' },
    subjects: [
      { _id: 'Subject 1', name: 'Subject 1' },
      { _id: 'Subject 2', name: 'Subject 2' }
    ]
  },
  {
    _id: '2',
    category: { _id: 'Category 3', name: 'Category 3' },
    subjects: [
      { _id: 'Subject 4', name: 'Subject 4' },
      { _id: 'Subject 5', name: 'Subject 5' }
    ]
  }
]

describe('ProfessionalCategoryList', () => {
  it('renders the list of professional categories', () => {
    render(
      <ProfessionalCategoryList
        handleDeleteCategory={vi.fn()}
        items={mockItems}
        openProfessionalCategoryModal={vi.fn()}
      />
    )

    const categoryElements = screen.getAllByTestId('professional-category')
    expect(categoryElements).toHaveLength(mockItems.length)
  })

  it('calls handleDeleteCategory when the delete button is clicked', () => {
    const MockHandleDeleteCategory = vi.fn()
    render(
      <ProfessionalCategoryList
        handleDeleteCategory={MockHandleDeleteCategory}
        items={mockItems}
        openProfessionalCategoryModal={vi.fn()}
      />
    )

    const deleteButtons = screen.getAllByTestId('delete')
    deleteButtons.forEach((button) => {
      fireEvent.click(button)
    })

    expect(MockHandleDeleteCategory).toHaveBeenCalledTimes(mockItems.length)
  })
})
