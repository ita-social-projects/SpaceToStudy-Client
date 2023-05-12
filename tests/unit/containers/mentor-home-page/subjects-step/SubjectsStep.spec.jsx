import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { ModalProvider } from '~/context/modal-context'
import { StepProvider } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

vi.mock('axios')
vi.mock('~/services/category-service')
vi.mock('~/services/subject-service')

const mockSubjectsNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' },
  { _id: '3', name: 'Category 3' },
  { _id: '4', name: 'Category 4' }
]
categoryService.getCategoriesNames.mockResolvedValue({
  data: mockSubjectsNames
})

subjectService.getSubjectsNames.mockResolvedValue({
  data: mockSubjectsNames
})

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)

describe('SubjectsStep test with some data', async () => {
  beforeEach(async () => {
    render(
      <ModalProvider>
        <StepProvider>
          <SubjectsStep btnsBox={btnsBox} stepLabel={'subjects'} />
        </StepProvider>
      </ModalProvider>
    )
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )

    expect(addSubject).toBeInTheDocument()

    fireEvent.click(firstField)
    fireEvent.change(firstField, { target: { value: 'Category 1' } })
    fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(secondField)
    fireEvent.change(secondField, { target: { value: 'Category 2' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    // fireEvent.click(addSubject)
  })

  it('should add a new subject', () => {
    const addSubject = screen.getByTestId('add-subject')
    const firstField = screen.getAllByLabelText(
      'becomeTutor.categories.mainSubjectsLabel'
    )

    expect(addSubject).toBeInTheDocument()

    // fireEvent.click(firstField)
    // fireEvent.change(firstField, { target: { value: 'Category 3' } })
    // fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    // fireEvent.keyDown(firstField, { key: 'Enter' })

    const secondField = screen.getByLabelText(
      /becomeTutor.categories.subjectLabel/i
    )

    fireEvent.click(secondField)
    fireEvent.change(secondField, { target: { value: 'Category 4' } })
    fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    fireEvent.keyDown(secondField, { key: 'Enter' })
    fireEvent.click(addSubject)

    console.log(firstField)

    screen.debug()

    // const chips = await screen.findAllByTestId('chip')
    // expect(chips.length).toBe(2)
  })

  // it('should delete a subject', () => {
  //   const closeBtn = screen.queryAllByTestId('close-btn')[0]
  //   const firstChip = screen.queryAllByTestId('chip')

  //   expect(firstChip.length).toBe(1)
  //   fireEvent.click(closeBtn)
  // })

  // it('should show an error message "All fields must be filled"', () => {
  //   const addSubject = screen.getByTestId('add-subject')

  //   expect(addSubject).toBeInTheDocument()

  //   const firstField = screen.getByLabelText(
  //     /becomeTutor.categories.mainSubjectsLabel/i
  //   )

  //   fireEvent.click(firstField)
  //   fireEvent.change(firstField, { target: { value: 'Mathemat' } })
  //   fireEvent.keyDown(firstField, { key: 'ArrowDown' })
  //   fireEvent.keyDown(firstField, { key: 'Enter' })

  //   fireEvent.click(addSubject)

  //   expect(screen.getByTestId('error-subject')).toHaveTextContent(
  //     'becomeTutor.categories.emptyFields'
  //   )
  // })

  // it('should show an error message "You have the same subject"', async () => {
  //   const addSubject = screen.getByTestId('add-subject')

  //   expect(addSubject).toBeInTheDocument()

  //   const firstField = screen.getByLabelText(
  //     /becomeTutor.categories.mainSubjectsLabel/i
  //   )

  //   fireEvent.click(firstField)
  //   fireEvent.change(firstField, { target: { value: 'Languages' } })
  //   fireEvent.keyDown(firstField, { key: 'ArrowDown' })
  //   fireEvent.keyDown(firstField, { key: 'Enter' })

  //   const secondField = screen.getByLabelText(
  //     /becomeTutor.categories.subjectLabel/i
  //   )

  //   fireEvent.click(secondField)
  //   fireEvent.change(secondField, { target: { value: 'Ukranian' } })
  //   fireEvent.keyDown(secondField, { key: 'ArrowDown' })
  //   fireEvent.keyDown(secondField, { key: 'Enter' })
  //   fireEvent.click(addSubject)
  //   fireEvent.click(addSubject)

  //   expect(screen.getByTestId('error-subject')).toHaveTextContent(
  //     'becomeTutor.categories.sameSubject'
  //   )
  // })
})
