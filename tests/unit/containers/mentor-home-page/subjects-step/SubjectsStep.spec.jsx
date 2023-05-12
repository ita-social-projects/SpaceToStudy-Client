import { render, screen, fireEvent } from '@testing-library/react'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'

vi.mock('~/hooks/use-categories-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: [
      { _id: '123', name: 'Category 1' },
      { _id: '456', name: 'Category 2' },
      { _id: '789', name: '' }
    ]
  })
}))

vi.mock('~/hooks/use-subjects-names', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    response: ['Subject 1', 'Subject 2']
  })
}))

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('SubjectsStep test with some data', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepProvider>
          <SubjectsStep btnsBox={btnsBox} stepLabel={'subjects'} />
        </StepProvider>
      </ModalProvider>
    )
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    expect(addSubject).toBeInTheDocument()

    fireEvent.click(firstField)
    fireEvent.change(firstField, { target: { value: 'Languages' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(secondField)
    fireEvent.change(secondField, { target: { value: 'Danish' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)
  })

  it('should add a new subject', async () => {
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    expect(addSubject).toBeInTheDocument()

    fireEvent.click(firstField)
    fireEvent.change(firstField, { target: { value: 'Languages' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(secondField)
    fireEvent.change(secondField, { target: { value: 'English' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)
    const chips = await screen.findAllByTestId('chip')
    expect(chips.length).toBe(2)
  })

  it('should delete a subject', () => {
    const closeBtn = screen.queryAllByTestId('close-btn')[0]
    const firstChip = screen.queryAllByTestId('chip')

    expect(firstChip.length).toBe(1)
    fireEvent.click(closeBtn)
  })

  it('should show an error message "All fields must be filled"', () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    fireEvent.click(firstField)
    fireEvent.change(firstField, { target: { value: 'Mathemat' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    fireEvent.click(addSubject)

    expect(screen.getByTestId('error-subject')).toHaveTextContent(
      'becomeTutor.categories.emptyFields'
    )
  })

  it('should show an error message "You have the same subject"', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getByLabelText(
      /becomeTutor.categories.mainSubjectsLabel/i
    )

    fireEvent.click(firstField)
    fireEvent.change(firstField, { target: { value: 'Languages' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(secondField)
    fireEvent.change(secondField, { target: { value: 'Ukranian' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)
    fireEvent.click(addSubject)

    expect(screen.getByTestId('error-subject')).toHaveTextContent(
      'becomeTutor.categories.sameSubject'
    )
  })
})
