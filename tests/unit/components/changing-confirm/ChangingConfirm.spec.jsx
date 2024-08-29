import { render, screen } from '@testing-library/react'
import ChangeConfirm from '~/components/changing-confirm/ChangeConfirm'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, options) =>
      key
        .replace('changeConfirm.', '')
        .replace('{resource}', options?.resource || '')
  })
}))

describe('ChangeConfirm component tests', () => {
  const props = {
    title: 'Course Title',
    courseList: [
      { title: 'Course 1', subTitle: 'subtitle1' },
      { title: 'Course 2', subTitle: 'subtitle2' }
    ]
  }

  beforeEach(() => {
    render(<ChangeConfirm {...props} />)
  })

  it('should render the warning icon', () => {
    const iconElement = screen.getByTestId('warning-icon')
    expect(iconElement).toBeInTheDocument()
  })

  it('should render course list items with titles and subtitles', () => {
    const courseTitle1 = screen.getByText('Course 1')
    const courseSubtitle1 = screen.getByText('subtitle1')
    const courseTitle2 = screen.getByText('Course 2')
    const courseSubtitle2 = screen.getByText('subtitle2')

    expect(courseTitle1).toBeVisible()
    expect(courseSubtitle1).toBeVisible()
    expect(courseTitle2).toBeVisible()
    expect(courseSubtitle2).toBeVisible()
  })

  it('should render buttons with correct text', () => {
    const backButton = screen.getByText('backButton')
    const confirmButton = screen.getByText('confirmButton')

    expect(backButton).toBeVisible()
    expect(confirmButton).toBeVisible()
  })
})
