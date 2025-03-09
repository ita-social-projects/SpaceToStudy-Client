import { render, screen } from '@testing-library/react'
import AppRating from '~/components/app-rating/AppRating'

describe('AppRating component', () => {
  it('only 1 star should be checked', () => {
    const props = { value: 1, precision: 1 }
    render(<AppRating {...props} />)

    expect(screen.getAllByRole('radio')[0]).toBeChecked()
    expect(screen.getAllByRole('radio')[1]).not.toBeChecked()
  })
  it('should display the number prop is true', () => {
    const props = { value: 3.5, showNumber: true }
    render(<AppRating {...props} />)
    const smallNumberElement = screen.getByText(props.value.toString())

    expect(smallNumberElement).toBeInTheDocument()
  })
})
