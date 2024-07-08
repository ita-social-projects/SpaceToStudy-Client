import AboutTutorAccordion from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

const mockedData = {
  awards: 'My awards',
  workExperience: 'My work Experience',
  education: 'Education',
  scientificActivities: 'Scientific activities'
}

describe('AboutTutorAccordion', () => {
  beforeEach(() => {
    renderWithProviders(
      <AboutTutorAccordion data={mockedData} handleInputChange={() => {}} />
    )
  })

  it('should open first accordion by default', () => {
    const textAreas = screen.getAllByLabelText(
      'editProfilePage.profile.professionalTab.accordion.textareaLabel'
    )

    expect(textAreas).toHaveLength(4)
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
