import { render, screen } from '@testing-library/react'
import ResourceActionContainer from '~/containers/course-section/resource-item/resource-action/ResourceAction'
import { ResourcesTypesEnum as ResourceType } from '~/types'
import React from 'react'

describe('ResourceAction', () => {
  const baseResource = {
    _id: '123',
    resourceType: ResourceType.Attachment,
    fileName: 'test.pdf'
  }
  const status = 'Test status'
  const availabilityStatus = <div>Available</div>
  const actionButtons = <div>Actions</div>

  it('renders DownloadButton for student with Attachment and isView', () => {
    render(
      <ResourceActionContainer
        actionButtons={actionButtons}
        availabilityStatus={availabilityStatus}
        isStudent
        isView
        resource={baseResource}
        status={status}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('renders availabilityStatus for student when not viewable attachment', () => {
    const resource = {
      _id: '123',
      resourceType: ResourceType.Link,
      fileName: 'test.pdf'
    }
    render(
      <ResourceActionContainer
        actionButtons={actionButtons}
        availabilityStatus={availabilityStatus}
        isStudent
        isView
        resource={resource}
        status={status}
      />
    )

    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders availabilityStatus for student when not view', () => {
    render(
      <ResourceActionContainer
        actionButtons={actionButtons}
        availabilityStatus={availabilityStatus}
        isStudent
        isView={false}
        resource={baseResource}
        status={status}
      />
    )

    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders availabilityStatus for teacher in view mode', () => {
    render(
      <ResourceActionContainer
        actionButtons={actionButtons}
        availabilityStatus={availabilityStatus}
        isStudent={false}
        isView
        resource={baseResource}
        status={status}
      />
    )

    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders actionButtons for teacher when not view', () => {
    render(
      <ResourceActionContainer
        actionButtons={actionButtons}
        availabilityStatus={availabilityStatus}
        isStudent={false}
        isView={false}
        resource={baseResource}
        status={status}
      />
    )

    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
})
