import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AppPagination from '~/components/app-pagination/AppPagination'

const handleChangePaginationController = vi.fn()

describe('AppPagination', () => {
  beforeEach(() => {
    render(
      <AppPagination
        onChange={handleChangePaginationController}
        page={1}
        pageCount={10}
      />
    )
  })

  it('should render pagination component', () => {
    const pagination = screen.getByRole('navigation')

    expect(pagination).toBeInTheDocument()
  })

  it('should call setCurrentPage when page is changed', () => {
    const secondButton = screen.getByLabelText('Go to page 2')

    fireEvent.click(secondButton)

    expect(handleChangePaginationController).toHaveBeenCalledTimes(1)
  })
})
