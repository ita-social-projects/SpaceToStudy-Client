import { screen, fireEvent } from '@testing-library/react'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { renderWithProviders } from '~tests/test-utils'

const mockedData = {
  sections: [
    {
      title: 'Section1 title',
      description: 'Section1 description',
      lessons: [],
      quizzes: [],
      attachments: [],
      id: '17121748017180'
    },
    {
      title: 'Section2 title',
      description: 'Section2 description',
      lessons: [],
      quizzes: [],
      attachments: [],
      id: '17121748017181'
    }
  ]
}

describe('CooperationActivitiesList', () => {
  it('should add a new section when Add activity button is clicked', async () => {
    renderWithProviders(<CooperationActivitiesList data={mockedData} />)
    const hoverElement = await screen.findAllByTestId('addActivity-container')

    fireEvent.mouseOver(hoverElement[0])

    const addButton = screen.getAllByText('Add activity')

    fireEvent.click(addButton[0])
    const menuItem = await screen.findAllByText(
      'cooperationsPage.manyTypes.module'
    )
    fireEvent.click(menuItem[0])
    const sections = await screen.findAllByTestId('addActivity-container')
    expect(sections.length).toBe(2)
  })
})
