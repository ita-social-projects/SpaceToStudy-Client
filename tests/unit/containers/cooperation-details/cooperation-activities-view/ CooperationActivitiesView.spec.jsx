import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserRoleEnum } from '~/types'

import CooperationActivitiesView from '~/containers/cooperation-details/cooperation-activities-view/CooperationActivitiesView.tsx'

vi.mock('~/components/cooperation-section-view/CooperationSectionView', () => ({
  default: ({ id, item }) => (
    <div data-testid={`section-${id}`}>{item.title}</div>
  )
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn().mockReturnValue({
    sections: [
      { _id: '1', title: 'Section1' },
      { _id: '2', title: 'Section2' }
    ],
    userRole: UserRoleEnum.Tutor
  }),
  useAppDispatch: vi.fn().mockReturnValue(vi.fn())
}))

const setEditMode = vi.fn()

describe('CooperationActivitiesView', () => {
  beforeEach(() => {
    render(<CooperationActivitiesView setEditMode={setEditMode} />)
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
})
