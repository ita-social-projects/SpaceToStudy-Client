import { render, screen } from '@testing-library/react'
import Home from './pages/home/Home'

test('renders learn react link', () => {
  render(<Home />)
  screen.debug()
  const linkElement = screen.getByText('common.title')
  expect(linkElement).toBeInTheDocument()
})
