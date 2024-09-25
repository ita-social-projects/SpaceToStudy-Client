import { screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import ActiveStudent from '~/components/active-students/ActiveStudent'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

describe('ActiveStudent', () => {
  it('should navigate to cooperation', () => {
    renderWithProviders(<ActiveStudent cooperationId={'cooperationId'} />)

    const studentCard = screen.getByTestId('studentCard')
    fireEvent.click(studentCard)

    waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith(
        '/my-cooperations/cooperationId'
      )
    )
  })
})
