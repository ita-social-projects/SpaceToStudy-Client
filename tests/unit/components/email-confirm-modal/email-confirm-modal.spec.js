// import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// import { renderWithProviders } from '~tests/test-utils'
// import EmailConfirmModal from '~/components/email-confirm-modal/email-confirm-modal'
// import { useContext } from 'react'
//
// // jest.mock('react', () => {
// //   return { ...jest.requireActual('react'), useContext: jest.fn() }
// // })
// const closeModal = jest.fn()
// const openLoginDialog = jest.fn()
//
// describe('EmailConfirmModal test', () => {
//   const props = {
//     confirmToken: 'test',
//     closeModal: closeModal
//   }
//
//   beforeEach(() => {
//     renderWithProviders(<EmailConfirmModal { ...props } />)
//     // render(<EmailConfirmModal { ...props } />)
//   })
//
//   it('should render image',() => {
//     const modalImg = screen.getByAltText('email-confirm-icon')
//
//     expect(modalImg).toBeInTheDocument()
//   })
//
//   it('should render message',() => {
//     const message = screen.getByTestId('confirm-message')
//
//     expect(message).toBeInTheDocument()
//   })
//
//   it('should render button',() => {
//     const button = screen.getByTestId('toLoginButton')
//
//     expect(button).toBeInTheDocument()
//   })
//
//   it('should open popup on button click', async () => {
//     const button = screen.getByTestId('toLoginButton')
//     fireEvent.click(button)
//
//     await waitFor(() => expect(openLoginDialog).toHaveBeenCalled())
//   })
//
//   // it('should useCallback return function', () => {
//   //   const serviceFunction = jest.fn()
//   //   expect(typeof serviceFunction).toBe('function')
//   // })
//
// })
