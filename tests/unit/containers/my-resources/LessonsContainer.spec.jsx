import { screen } from '@testing-library/react'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { renderWithProviders } from '~tests/test-utils'

describe('LessonsContainer component ', () => {
  beforeEach(() => {
    renderWithProviders(<LessonsContainer />)
  })

  it('should render new lesson button', () => {
    const newLessonBtn = screen.getAllByTestId('newLessonBtn')

    expect(newLessonBtn).not.toBeNull()
  })
})
