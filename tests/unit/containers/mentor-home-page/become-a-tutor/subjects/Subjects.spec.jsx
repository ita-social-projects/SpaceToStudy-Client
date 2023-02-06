import { render, screen, fireEvent, within } from '@testing-library/react'
import Subjects from '~/containers/tutor-home-page/subjects/Subjects'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('AddDocuments test with some data', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepProvider>
          <Subjects btnsBox={btnsBox} stepLabel={'subjects'} />
        </StepProvider>
      </ModalProvider>
    )
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getAllByTestId('autocomplete-search')[0]
    const firstInput = within(firstField).getByRole('combobox')

    expect(addSubject).toBeInTheDocument()

    fireEvent.click(firstInput)
    fireEvent.change(firstInput, { target: { value: 'Languages' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getAllByTestId('autocomplete-search')[1]
    const secondInput = within(secondField).getByRole('combobox')

    fireEvent.click(secondInput)
    fireEvent.change(secondInput, { target: { value: 'Danish' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)
  })

  it('should add a new subject', async () => {
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getAllByTestId('autocomplete-search')[0]
    const firstInput = within(firstField).getByRole('combobox')

    expect(addSubject).toBeInTheDocument()

    fireEvent.click(firstInput)
    fireEvent.change(firstInput, { target: { value: 'Languages' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getAllByTestId('autocomplete-search')[1]
    const secondInput = within(secondField).getByRole('combobox')

    fireEvent.click(secondInput)
    fireEvent.change(secondInput, { target: { value: 'English' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)
    const chips = await screen.findAllByTestId('chip')
    expect(chips.length).toBe(2)
  })

  it('should delete a subject', () => {
    const closeBtn = screen.queryAllByTestId('close-btn')

    const firstChip = screen.queryAllByTestId('chip')[0]

    expect(firstChip).toBeDefined()

    fireEvent.click(closeBtn[0])

    const newChips = screen.queryAllByTestId('chip')
    expect(newChips.length).toBe(0)
  })

  it('should show an error message "All fields must be filled"', () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getAllByTestId('autocomplete-search')[0]
    const input = within(firstField).getByRole('combobox')
    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'Mathemat' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    fireEvent.click(addSubject)

    expect(screen.getByTestId('error-subject')).toHaveTextContent('becomeTutor.categories.emptyFields')
  })

  it('should show an error message "You have the same subject"', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getAllByTestId('autocomplete-search')[0]
    const firstInput = within(firstField).getByRole('combobox')

    fireEvent.click(firstInput)
    fireEvent.change(firstInput, { target: { value: 'Languages' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getAllByTestId('autocomplete-search')[1]
    const secondInput = within(secondField).getByRole('combobox')

    fireEvent.click(secondInput)
    fireEvent.change(secondInput, { target: { value: 'Ukranian' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)
    fireEvent.click(addSubject)

    expect(screen.getByTestId('error-subject')).toHaveTextContent('becomeTutor.categories.sameSubject')
  })
})

describe('AddDocuments test with empty data', () => {
  beforeEach(() => {
    render(
      <ModalProvider>
        <StepProvider>
          <Subjects btnsBox={btnsBox} stepLabel={'subjects'} />
        </StepProvider>
      </ModalProvider>
    )
  })

  it('should not add new subject', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    fireEvent.click(addSubject)

    setTimeout(() => {
      const chips = screen.getAllByTestId('chip')
      expect(chips.length).toBe(0)
    }, 0)
  })
})
