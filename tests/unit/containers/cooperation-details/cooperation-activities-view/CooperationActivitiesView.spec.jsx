import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CooperationActivitiesView from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView'

const setEditMode = vi.fn()
describe('CooperationActivitiesView', () => {
  beforeEach(() => {
    renderWithProviders(<CooperationActivitiesView setEditMode={setEditMode} />)
  })

  it('should render edit button', () => {
    const button = screen.getByTestId('iconButton')

    expect(button).toBeInTheDocument()
  })

  it('should click on Edit button', () => {
    const button = screen.getByTestId('iconButton')
    act(() => {
      fireEvent.click(button)
    })

    expect(setEditMode).toHaveBeenCalled()
  })
})
