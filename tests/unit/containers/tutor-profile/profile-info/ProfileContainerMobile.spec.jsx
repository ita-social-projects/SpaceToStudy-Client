import React from 'react'
import { render, screen } from '@testing-library/react'
import ProfileContainerMobile from '~/containers/tutor-profile/profile-info/ProfileContainerMobile'

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

describe('ProfileContainerMobile', () => {
  beforeEach(() => {
    render(<ProfileContainerMobile {...mockProps} />)
  })

  it('renders user information', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()

    expect(screen.getByText('Experienced tutor')).toBeInTheDocument()
  })

  it('renders action icon', () => {
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })

  it('renders chip items', () => {
    expect(screen.getByText('Subject 1')).toBeInTheDocument()

    expect(screen.getByText('Subject 2')).toBeInTheDocument()
  })

  it('renders done items', () => {
    expect(screen.getByText('Item 1')).toBeInTheDocument()

    expect(screen.getByText('Description 1')).toBeInTheDocument()

    expect(screen.getByText('Item 2')).toBeInTheDocument()

    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })

  it('renders account info and button group', () => {
    expect(screen.getByText('Account info')).toBeInTheDocument()

    expect(screen.getByText('Button group')).toBeInTheDocument()
  })
})
