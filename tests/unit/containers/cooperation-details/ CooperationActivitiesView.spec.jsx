import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CooperationActivitiesView from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView.tsx'

vi.mock('~/components/cooperation-section-view/CooperationSectionView', () => ({
  default: ({ id, item }) => (
    <div data-testid={`section-${id}`}>{item.title}</div>
  )
}))

const setEditMode = vi.fn()
const mockSections = [
  { _id: '1', title: 'Section1' },
  { _id: '2', title: 'Section2' }
]

describe('CooperationActivitesView', () => {
  beforeEach(() => {
    render(
      <CooperationActivitiesView
        sections={mockSections}
        setEditMode={setEditMode}
      />
    )
  })

  it('should render sections correctly', () => {
    screen.debug()

    const section1 = screen.getByTestId('section-1')
    expect(section1).toHaveTextContent('Section1')

    const section2 = screen.getByTestId('section-2')
    expect(section2).toHaveTextContent('Section2')
  })
})
