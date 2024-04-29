import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

describe('ImgTitleDescription test', () => {
  beforeEach(() => {
    renderWithProviders(
      <ImgTitleDescription description='description' img='info' title='title' />
    )
  })

  it('should render image', () => {
    const learnImg = screen.getByAltText('info')

    expect(learnImg).toBeInTheDocument()
  })

  it('should render title', () => {
    const title = screen.getByText('title')

    expect(title).toBeInTheDocument()
  })

  it('should render description', () => {
    const title = screen.getByText('description')

    expect(title).toBeInTheDocument()
  })
})
