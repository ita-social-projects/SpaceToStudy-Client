import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent } from '@testing-library/react'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'

describe('CourseSectionContainer tests', () => {
  beforeEach(() => {
    renderWithProviders(<CourseSectionContainer />)
  })

  it('should render inouts for title and description', () => {
    const titleInput = screen.getByText('course.courseSection.defaultNewTitle')
    const labelInput = screen.getByText(
      'course.courseSection.defaultNewDescription'
    )

    expect(titleInput).toBeInTheDocument()
    expect(labelInput).toBeInTheDocument()
  })

  it('should render menu button and menu', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    fireEvent.click(addResourcesBtn)
    const menuList = screen.getByRole('menu')

    expect(menuList).toBeInTheDocument()
  })

  it('should close menu after click', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    fireEvent.click(addResourcesBtn)
    const menuListItem = screen.getAllByRole('menuitem')[0]
    fireEvent.click(menuListItem)

    expect(menuListItem).not.toBeVisible()
  })

  it('should hide section content', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    const hideBtn = screen.getAllByRole('button')[0]

    fireEvent.click(hideBtn)

    expect(addResourcesBtn).not.toBeVisible()
  })
})
