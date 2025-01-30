import { render, fireEvent, screen, waitFor, userEvent } from '@testing-library/react'
import { vi } from 'vitest'
import QuestionComment from '~/containers/quiz/question-comment/QuestionComment.tsx'

const mockQuiz = {
  author: {
    firstName: 'John',
    lastName: 'Doe',
    photo: 'avatar.jpg'
  }
}
const mockSubmit = vi.fn()

describe('QuestionComment', () => {
    beforeEach(() => {
        render(
            <QuestionComment
                quiz={mockQuiz}
                onCommentSubmit={mockSubmit} 
            />
        )
        mockSubmit.mockClear()
    })

    test('should render comment button', () => {
        const addCommentButton = screen.getByTestId('AddCommentOutlinedIcon')
        expect(addCommentButton).toBeInTheDocument()
    })

    test('should open comment input when comment button is clicked', () => {
        const addCommentButton = screen.getByTestId('AddCommentOutlinedIcon')
        fireEvent.click(addCommentButton)

        const inputField = screen.getByTestId('textField')
        expect(inputField).toBeInTheDocument()
    })

    test('should does not submit comment if input is empty', async () => {
        const addCommentButton = screen.getByTestId('AddCommentOutlinedIcon')
        fireEvent.click(addCommentButton)

        const submitButton = screen.getByTestId('SendIcon')
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockSubmit).not.toHaveBeenCalled()
        })
    })

    test('should submit comment if input is not empty', async () => {
        const addCommentButton = screen.getByTestId('AddCommentOutlinedIcon')
        fireEvent.click(addCommentButton)

        const textField = screen.queryByTestId('textField').querySelector('textarea')
        await waitFor(() => {
            expect(textField).toBeInTheDocument()
        })
        fireEvent.change(textField, { target: { value: 'Great answer!' } })

        const submitButton = screen.getByTestId('SendIcon')
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith('Great answer!')
        })
    })

    test('should toggle comment input visibility when clicking comment button', async () => {
        const addCommentButton = screen.getByTestId('AddCommentOutlinedIcon')
        
        const textField = screen.queryByTestId('textField')
        expect(textField).not.toBeInTheDocument()

        fireEvent.click(addCommentButton)
        await waitFor(() => {
            expect(screen.queryByTestId('textField')).toBeInTheDocument()
        })

        fireEvent.click(addCommentButton)
        expect(textField).not.toBeInTheDocument()
    })
})
