import ProfessionalCategory from '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { useTranslation } from 'react-i18next'
import { titleToCamel } from '~/utils/title-to-camel-case'
import { vi } from 'vitest'
const { t } = useTranslation()
const mockOpenProfessionalCategoryModal = vi.fn()
const mockedHandleDelete = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, options) => options?.defaultValue || key
  })
}))

const categoryWithSubjects = {
  _id: '648850c4fdc2d1a130c24aea',
  category: {
    _id: '64884f21fdc2d1a130c24ac0',
    name: 'Music',
    appearance: {
      color: '#FFD700',
      icon: 'MusicNoteIcon'
    }
  },
  subjects: [{ _id: '64885108fdc2d1a130c24af9', name: 'Guitar' }],
  isDeletionBlocked: false
}

const blockedCategory = {
  _id: '648850c4fdc2d1a130c24aea',
  category: {
    _id: '64884f21fdc2d1a130c24ac0',
    name: 'Music',
    appearance: {
      color: '#FFD700',
      icon: 'MusicNoteIcon'
    }
  },
  subjects: [{ _id: '64885108fdc2d1a130c24af9', name: 'Guitar' }],
  isDeletionBlocked: true
}

const renderProfessionalCategoryWithItem = (item) => {
  renderWithProviders(
    <ProfessionalCategory
      handleDelete={mockedHandleDelete}
      item={item}
      openProfessionalCategoryModal={mockOpenProfessionalCategoryModal}
    />
  )
}

describe('ProfessionalCategory', () => {
  it('should open modal when Delete button is clicked', () => {
    renderProfessionalCategoryWithItem(categoryWithSubjects)

    const deleteCategoryButton = screen.getByTestId(
      'delete-professional-category-button'
    )
    fireEvent.click(deleteCategoryButton)

    const deleteCategoryModalTitle = screen.getByText(
      /editProfilePage.profile.professionalTab.deleteCategoryModal.title/
    )
    expect(deleteCategoryModalTitle).toBeInTheDocument()

    const confirmBtn = screen.getByText(
      /editProfilePage.profile.professionalTab.deleteCategoryModal.submitBtn/
    )

    fireEvent.click(confirmBtn)

    expect(mockedHandleDelete).toHaveBeenCalled()
  })

  it('should disable delete button if deletion blocked', () => {
    renderProfessionalCategoryWithItem(blockedCategory)
    const deleteCategoryButton = screen.getByTestId(
      'delete-professional-category-button'
    )

    expect(deleteCategoryButton).toBeDisabled()
  })

  it('should render subjects correctly', () => {
    renderProfessionalCategoryWithItem(categoryWithSubjects)

    const firstSubjectName = t(
      `subjects.${titleToCamel(categoryWithSubjects.subjects[0].name)}`,
      {
        defaultValue: categoryWithSubjects.subjects[0].name
      }
    )
    const firstSubjectNameElement = screen.getByText(firstSubjectName)
    expect(firstSubjectNameElement).toBeInTheDocument()

    const subjectLabels = screen.getAllByText(
      /editProfilePage.profile.professionalTab.subject/
    )

    expect(subjectLabels).toHaveLength(categoryWithSubjects.subjects.length)
  })

  it('should open edit subject modal correctly', () => {
    renderProfessionalCategoryWithItem(categoryWithSubjects)

    const editBtn = screen.getByText(
      /editProfilePage.profile.professionalTab.editCategoryBtn/
    )
    expect(editBtn).toBeInTheDocument()

    fireEvent.click(editBtn)

    expect(mockOpenProfessionalCategoryModal).toHaveBeenCalled()
  })
})
