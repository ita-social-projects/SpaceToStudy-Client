import AboutTutorAccordion from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

describe('AboutTutorAccordion', () => {
  beforeEach(() => {
    renderWithProviders(<AboutTutorAccordion />)
  })

  it('should open first accordion by default', () => {
    const textareas = screen.getAllByLabelText(
      'editProfilePage.profile.professionalTab.accordion.textareaLabel'
    )

    expect(textareas).toHaveLength(4)
    expect(screen.getByTestId('0-true')).toBeInTheDocument()
    expect(screen.getByTestId('1-false')).toBeInTheDocument()
  })

  it('should open corresponding accordion content', () => {
    const secondItemTitle = screen.getByText(
      'editProfilePage.profile.professionalTab.accordion.workExperience'
    )
    fireEvent.click(secondItemTitle)

    expect(screen.getByTestId('0-false')).toBeInTheDocument()
    expect(screen.getByTestId('1-true')).toBeInTheDocument()
  })
})
