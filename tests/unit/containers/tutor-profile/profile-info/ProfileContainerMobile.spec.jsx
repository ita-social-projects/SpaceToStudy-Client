import React from 'react'
import { render } from '@testing-library/react'
import ProfileContainerMobile from '~/containers/tutor-profile/profile-info/ProfileContainerMobile'

describe('ProfileContainerMobile', () => {
  const mockProps = {
    userData: {
      firstName: 'John',
      lastName: 'Doe',
      professionalSummary: 'Experienced tutor',
      photo: 'john-doe.jpg'
    },
    actionIcon: <button>Edit</button>,
    accInfo: <div>Account info</div>,
    buttonGroup: <div>Button group</div>,
    defaultQuantity: 2,
    doneItems: [
      { title: 'Item 1', description: 'Description 1' },
      { title: 'Item 2', description: 'Description 2' }
    ],
    chipItems: ['Subject 1', 'Subject 2']
  }

  it('renders user information', () => {
    const { getByText } = render(<ProfileContainerMobile {...mockProps} />)

    expect(getByText('John Doe')).toBeInTheDocument()
    expect(getByText('Experienced tutor')).toBeInTheDocument()
  })

  it('renders action icon', () => {
    const { getByText } = render(<ProfileContainerMobile {...mockProps} />)
    expect(getByText('Edit')).toBeInTheDocument()
  })

  it('renders chip items', () => {
    const { getByText } = render(<ProfileContainerMobile {...mockProps} />)
    expect(getByText('Subject 1')).toBeInTheDocument()
    expect(getByText('Subject 2')).toBeInTheDocument()
  })

  it('renders done items', () => {
    const { getByText } = render(<ProfileContainerMobile {...mockProps} />)
    expect(getByText('Item 1')).toBeInTheDocument()
    expect(getByText('Description 1')).toBeInTheDocument()
    expect(getByText('Item 2')).toBeInTheDocument()
    expect(getByText('Description 2')).toBeInTheDocument()
  })

  it('renders account info and button group', () => {
    const { getByText } = render(<ProfileContainerMobile {...mockProps} />)
    expect(getByText('Account info')).toBeInTheDocument()
    expect(getByText('Button group')).toBeInTheDocument()
  })
})
