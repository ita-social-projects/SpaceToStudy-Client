import { fireEvent, render, screen } from '@testing-library/react'
import GeneralInfo from '~/containers/tutor-home-page/general-info/GeneralInfo'
import { ModalProvider } from '~/context/modal-context'
import { SnackBarProvider } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
import { renderWithProviders } from '~tests/test-utils'

jest.mock('~/hooks/use-axios')

const fakeData = {
  response: ['Finland', 'France', 'Georgia', 'Germany']
}

const props = {
  stepLabel: ['generalInfo', 'languages', 'studyCategory', 'photoAndVideo'],
  errors: {
    firstName: '',
    experience: '',
    lastName: ''
  },
  data: {
    firstName: 'Test',
    lastName: 'Test',
    country: '',
    city: '',
    experience: 'vv'
  },
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  handleErrors: jest.fn(),
  handleSubmit: jest.fn(),
  setStepErrors: jest.fn(),
  setFieldValue: jest.fn()
}

describe('Login form test', () => {
  beforeEach(() => {
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(
      <ModalProvider>
        <GeneralInfo { ...props } />
      </ModalProvider>
    )
  })

  it('should render with title', () => {
    const title = screen.getByText(/becomeTutor.generalInfo.title/i)

    expect(title).toBeInTheDocument()
  })

  it('should show error for short text', () => {
    const textField = screen.getByLabelText(/becomeTutor.generalInfo.textFieldLabel/i)

    fireEvent.change(textField, {
      target: { value: 'New value' }
    })
    fireEvent.focus(textField)
    // const shortTextError = screen.getByText(/common.errorMessages.shortText/i)

    // expect(shortTextError).toBeInTheDocument()
    expect(props.errors.experience).toEqual('11')
  })

  it('should show error for long text', () => {
    const textField = screen.getByLabelText(/becomeTutor.generalInfo.textFieldLabel/i)
    // fireEvent.click(screen.getByText(/Experience/i))
    fireEvent.change(textField, {
      target: { value: 'Some experience.'.repeat(20) }
    })
    fireEvent.focus(textField)
    const longTextError = screen.getByText(/common.errorMessages.longText/i)

    expect(longTextError).toBeInTheDocument()
  })
})

describe('General Info test with errors', () => {
  const errors = {
    firstName: '',
    experience: 'common.errorMessages.shortText',
    lastName: ''
  }

  beforeEach(() => {
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(
      <ModalProvider>
        <GeneralInfo { ...props } errors={ errors } />
      </ModalProvider>
    )
  })

  it('should show error for short text', () => {
    const shortTextError = screen.getByText(/common.errorMessages.shortText/i)

    expect(shortTextError).toBeInTheDocument()
  })
})
