import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'
import useAxios from '~/hooks/use-axios'

const handleConfirm = vi.fn()
const closeModal = vi.fn()

vi.mock('~/hooks/use-axios')

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: closeModal
    })
  }
})

const props = {
  title: 'Course Title',
  resourceId: '123',
  onConfirm: handleConfirm
}

const fakeData = {
  courses: [
    {
      _id: 'testId1',
      title: 'Course 1',
      description: 'subtitle1',
      sections: [
        {
          _id: 'testId3',
          title: 'First module',
          description: 'description',
          resources: [
            {
              resource: {
                _id: '123'
              }
            },
            {
              resource: {
                _id: '111'
              }
            }
          ]
        }
      ]
    },
    {
      _id: 'testId2',
      title: 'Course 2',
      description: 'subtitle2',
      sections: [
        {
          _id: 'testId4',
          title: 'First module',
          description: 'description',
          resources: [
            {
              resource: {
                _id: '123'
              }
            },
            {
              resource: {
                _id: '111'
              }
            }
          ]
        }
      ]
    }
  ],
  cooperations: []
}

describe('ChangeResourceConfirmModal component tests', () => {
  it('should render properly', async () => {
    useAxios.mockImplementation(() => ({
      loading: false,
      response: fakeData
    }))
    renderWithProviders(<ChangeResourceConfirmModal {...props} />)

    const iconElement = await screen.findByTestId('warning-icon')
    const title = await screen.findByText('changeConfirm.title')
    expect(iconElement).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  it('should render course list items with titles', async () => {
    useAxios.mockImplementation(() => ({
      loading: false,
      response: fakeData
    }))
    renderWithProviders(<ChangeResourceConfirmModal {...props} />)
    const courseTitle1 = await screen.findByText('Course 1')
    const courseTitle2 = await screen.findByText('Course 2')

    expect(courseTitle1).toBeInTheDocument()
    expect(courseTitle2).toBeInTheDocument()
  })

  it('should render loader', async () => {
    useAxios.mockImplementation(() => ({
      loading: true,
      response: fakeData
    }))
    renderWithProviders(<ChangeResourceConfirmModal {...props} />)
    const loader = await screen.findByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should run onConfirm', async () => {
    useAxios.mockImplementation(() => ({
      loading: false,
      response: fakeData
    }))
    renderWithProviders(
      <ChangeResourceConfirmModal
        onConfirm={handleConfirm}
        resourceId='0'
        title='title'
      />
    )
    waitFor(() => expect(handleConfirm).toHaveBeenCalled())
    waitFor(() => expect(closeModal).toHaveBeenCalled())
  })
})
