import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppPagination from '~/components/app-pagination/AppPagination'

const setCurrentPage = vi.fn()

describe('AppPagination', () => {
  beforeEach(() => {
    render(<AppPagination
      itemsCount={100} page={1} itemsPerPage={5}
      onChange={setCurrentPage}
    />)
  })

  it('should render pagination component', () => {
    const pagination = screen.getByRole('navigation')

    expect(pagination).toBeInTheDocument()
  })

  it('should call setCurrentPage when page is changed', () => {
    const page2Button = screen.getByRole('button', { name: 'Go to page 2' })

    fireEvent.click(page2Button)

    expect(setCurrentPage).toHaveBeenCalledWith(2)
  })
})
