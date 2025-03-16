import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserRoleEnum } from '~/types'

import CooperationActivitiesView from '~/containers/cooperation-details/cooperation-activities-view/CooperationActivitiesView.tsx'

vi.mock('~/components/cooperation-section-view/CooperationSectionView', () => ({
  default: ({ item }) => (
    <div data-testid={`section-${item.id}`}>{item.title}</div>
  )
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn().mockReturnValue({
    sections: [
      { id: '1', title: 'Section1' },
      { id: '2', title: 'Section2' }
    ],
    userRole: UserRoleEnum.Tutor
  }),
  useAppDispatch: vi.fn().mockReturnValue(vi.fn())
}))

const setEditMode = vi.fn()

describe('CooperationActivitiesView', () => {
  beforeEach(() => {
    render(
      <CooperationActivitiesView progress={'50'} setEditMode={setEditMode} />
    )
  })

  it('should render sections correctly', () => {
    const section1 = screen.getByTestId('section-1')
    expect(section1).toHaveTextContent('Section1')

    const section2 = screen.getByTestId('section-2')
    expect(section2).toHaveTextContent('Section2')
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

  it('should render progress bar with 50%', () => {
    const progressBarHeader = screen.getByText(
      'cooperationDetailsPage.progressBar.yourProgress'
    )
    expect(progressBarHeader).toBeInTheDocument

    const progressBarValue = screen.getByText(
      '50% cooperationDetailsPage.progressBar.completed'
    )
    expect(progressBarValue).toBeInTheDocument()
  })
})
