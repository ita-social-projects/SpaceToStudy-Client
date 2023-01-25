import { render, screen, fireEvent, act, within } from '@testing-library/react'
import Subjects from '~/containers/tutor-home-page/subjects/Subjects'

const btnsBox = (
  <div>
    <button>back</button>
    <button>next</button>
  </div>
)
const mockData = {
  lessons: [
    { category: 'Languages', name: 'Chinese' },
    { category: 'Languages', name: 'Czech' },
    { category: 'Languages', name: 'Danish' },
    { category: 'Languages', name: 'Dutch' },
    { category: 'Languages', name: 'English' },
    { category: 'Languages', name: 'Estonian' }
  ]
}

const emptyMockData = {
  lessons: []
}

const handleData = jest.fn()

describe('AddDocuments test with some data', () => {
  beforeEach(() => {
    render(<Subjects btnsBox={ btnsBox } data={ mockData } handleData={ handleData } />)
  })

  it('should add new subject', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()
    act(() => {
      fireEvent.click(addSubject)
    })

    setTimeout(() => {
      const chips = screen.getAllByTestId('chip')
      expect(chips.length).toBe(6)
    }, 0)
  })

  it('should show an error message "All fields must be filled"', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()
    act(() => {
      fireEvent.click(addSubject)
    })

    expect(screen.getByTestId('error-subject')).toHaveTextContent('becomeTutor.categories.emptyFields')

    const firstField = screen.getAllByTestId('autocomplete-search')[0]
    const input = within(firstField).getByRole('combobox')
    act(() => {
      fireEvent.click(input)
    })
    act(() => {
      fireEvent.change(input, { target: { value: 'Langu' } })
    })
    act(() => {
      fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    })
    act(() => {
      fireEvent.keyDown(firstField, { key: 'Enter' })
    })

    act(() => {
      fireEvent.click(addSubject)
    })

    expect(screen.getByTestId('error-subject')).toHaveTextContent('becomeTutor.categories.emptyFields')
  })

  it('should show an error message "You have the same subject"', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()

    const firstField = screen.getAllByTestId('autocomplete-search')[0]
    const firstInput = within(firstField).getByRole('combobox')

    act(() => {
      fireEvent.click(firstInput)
    })
    act(() => {
      fireEvent.change(firstInput, { target: { value: 'Languages' } })
    })
    act(() => {
      fireEvent.keyDown(firstField, { key: 'ArrowDown' })
    })
    act(() => {
      fireEvent.keyDown(firstField, { key: 'Enter' })
    })

    const secondField = screen.getAllByTestId('autocomplete-search')[1]
    const secondInput = within(secondField).getByRole('combobox')

    act(() => {
      fireEvent.click(secondInput)
    })
    act(() => {
      fireEvent.change(secondInput, { target: { value: 'Danish' } })
    })
    act(() => {
      fireEvent.keyDown(secondField, { key: 'ArrowDown' })
    })
    act(() => {
      fireEvent.keyDown(secondField, { key: 'Enter' })
    })

    act(() => {
      fireEvent.click(addSubject)
    })

    expect(screen.getByTestId('error-subject')).toHaveTextContent('becomeTutor.categories.sameSubject')
  })
})

describe('AddDocuments test with empty data', () => {
  beforeEach(() => {
    render(<Subjects btnsBox={ btnsBox } data={ emptyMockData } handleData={ handleData } />)
  })

  it('should not add new subject', async () => {
    const addSubject = screen.getByTestId('add-subject')

    expect(addSubject).toBeInTheDocument()
    act(() => {
      fireEvent.click(addSubject)
    })

    setTimeout(() => {
      const chips = screen.getAllByTestId('chip')
      expect(chips.length).toBe(0)
    }, 0)
  })
})
