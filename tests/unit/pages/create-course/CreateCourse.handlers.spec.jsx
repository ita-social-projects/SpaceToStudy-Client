import {
  addNewSection,
  deleteSection,
  updateSectionsOrder,
  addSectionResources,
  updateResource,
  deleteResource,
  updateResourcesOrder
} from '~/pages/create-course/CreateCourse.handlers'
import { sectionInitialData } from '~/pages/create-course/CreateCourse.constants'
import { isValidUUID } from '~/utils/validations/isValidUUID'

describe('Test CreateCourse handlers:', () => {
  it('addNewSection: should add a new section with a unique ID', () => {
    const sections = []
    const setSectionsData = vi.fn()
    const ctx = { sections, setSectionsData }

    addNewSection(ctx)
    const newSection = setSectionsData.mock.calls[0][0][0]

    expect(setSectionsData).toHaveBeenCalledWith([
      { ...sectionInitialData, id: expect.any(String) }
    ])
    expect(isValidUUID(newSection.id)).toBe(true)
  })

  it('deleteSection: should delete a section by ID', () => {
    const sections = [{ id: 'section-1' }]
    const setSectionsData = vi.fn()
    const ctx = { sections, setSectionsData }

    deleteSection(ctx, 'section-1')

    expect(setSectionsData).toHaveBeenCalledWith([])
  })

  it('updateSectionsOrder: should update sections order', () => {
    const setSectionsData = vi.fn()
    const ctx = { setSectionsData }
    const newSectionsOrder = [{ id: 'section-1' }]

    updateSectionsOrder(ctx, newSectionsOrder)

    expect(setSectionsData).toHaveBeenCalledWith(newSectionsOrder)
  })

  it('addSectionResources: should add resources to a section', () => {
    const sections = [{ id: 'section-1', resources: [] }]
    const handleSectionChange = vi.fn()
    const ctx = { sections, handleSectionChange }
    const resources = [{ _id: '76', resourceType: 'type' }]

    addSectionResources(ctx, 'section-1', resources)
    const newResource = handleSectionChange.mock.calls[0][2][0].resource

    expect(handleSectionChange).toHaveBeenCalledWith('section-1', 'resources', [
      {
        resource: {
          id: expect.any(String),
          _id: resources[0]._id,
          resourceType: 'type'
        },
        resourceType: 'type'
      }
    ])
    expect(isValidUUID(newResource.id)).toBe(true)
  })

  it('updateResource: should update a resource in a section', () => {
    const sections = [
      {
        id: 'section-1',
        resources: [
          {
            resource: { id: 'resource-1', resourceType: 'type' },
            resourceType: 'type'
          }
        ]
      }
    ]
    const handleSectionChange = vi.fn()
    const ctx = { sections, handleSectionChange }
    const updatedResource = { id: 'resource-1', resourceType: 'new-type' }

    updateResource(ctx, 'section-1', 'resource-1', updatedResource)

    expect(handleSectionChange).toHaveBeenCalledWith('section-1', 'resources', [
      {
        id: 'resource-1',
        resource: { id: 'resource-1', resourceType: 'type' },
        resourceType: 'new-type'
      }
    ])
  })

  it('deleteResource: should delete a resource from a section', () => {
    const sections = [
      {
        id: 'section-1',
        resources: [{ resource: { id: 'resource-1' }, resourceType: 'type' }]
      }
    ]
    const handleSectionChange = vi.fn()
    const ctx = { sections, handleSectionChange }

    deleteResource(ctx, 'section-1', 'resource-1')

    expect(handleSectionChange).toHaveBeenCalledWith(
      'section-1',
      'resources',
      []
    )
  })

  it('updateResourcesOrder: should update resources order in a section', () => {
    const sections = [{ id: 'section-1', resources: [] }]
    const handleSectionChange = vi.fn()
    const ctx = { sections, handleSectionChange }
    const newResourcesOrder = [{ id: 'resource-1', resourceType: 'type' }]

    updateResourcesOrder(ctx, 'section-1', newResourcesOrder)

    expect(handleSectionChange).toHaveBeenCalledWith('section-1', 'resources', [
      {
        resource: { id: 'resource-1', resourceType: 'type' },
        resourceType: 'type'
      }
    ])
  })
})
