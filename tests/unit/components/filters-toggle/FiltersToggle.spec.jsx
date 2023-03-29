import { render } from '@testing-library/react'
import FiltersToggle from '~/components/filters-title/FiltersToggle'
import { vi } from 'vitest'

const mockedHandleToggle = vi.fn()

describe('FiltersToggle component', () => {
  beforeEach(() => {
    render(<FiltersToggle handleToggle={ mockedHandleToggle } />)
  })
})
