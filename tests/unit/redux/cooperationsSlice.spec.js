import reducer, {
  setCooperationSections,
  updateCooperationSection,
  deleteCooperationSection,
  addSectionResources,
  updateResourcesOrder,
  updateResource,
  deleteResource,
  setResourcesAvailability
} from '~/redux/features/cooperationsSlice'

import { ResourcesAvailabilityEnum } from '~/types'

describe('Test cooperationsSlice', () => {
  let initialState

  beforeEach(() => {
    initialState = {
      sections: [],
      resourcesAvailability: ResourcesAvailabilityEnum.OpenAll
    }
  })

  it('should set sections correctly with setCooperationSections', () => {
    const sections = [
      { _id: '1', id: '1', resources: [] },
      { _id: '2', id: '2', resources: [] }
    ]
    const action = setCooperationSections(sections)
    const state = reducer(initialState, action)
    expect(state.sections).toEqual(sections)
  })

  it('should update section correctly with updateCooperationSection', () => {
    const sectionId = '1'
    const initialStateWithSections = {
      ...initialState,
      sections: [{ id: sectionId, title: 'Initial Title', resources: [] }]
    }
    const action = updateCooperationSection({
      id: sectionId,
      field: 'title',
      value: 'Updated Title'
    })
    const state = reducer(initialStateWithSections, action)
    expect(state.sections[0].title).toEqual('Updated Title')
  })

  it('should delete section correctly with deleteCooperationSection', () => {
    const sectionId = '1'
    const initialStateWithSections = {
      ...initialState,
      sections: [{ id: sectionId, resources: [] }]
    }
    const action = deleteCooperationSection(sectionId)
    const state = reducer(initialStateWithSections, action)
    expect(state.sections.length).toBe(0)
  })

  it('should add resources to section correctly with addSectionResources', () => {
    const sectionId = '1'
    const resources = [
      { _id: 'r1', title: 'Resource 1', resourceType: 'video' }
    ]
    const initialStateWithSections = {
      ...initialState,
      sections: [{ id: sectionId, resources: [] }]
    }
    const action = addSectionResources({ sectionId, resources })
    const state = reducer(initialStateWithSections, action)
    expect(state.sections[0].resources).toHaveLength(1)
    expect(state.sections[0].resources[0].resource).toEqual(resources[0])
  })

  it('should update resources order correctly with updateResourcesOrder', () => {
    const sectionId = '1'
    const initialStateWithSections = {
      ...initialState,
      sections: [{ id: sectionId, resources: [{ _id: 'r1' }, { _id: 'r2' }] }]
    }
    const newResources = [{ _id: 'r2' }, { _id: 'r1' }]
    const action = updateResourcesOrder({ sectionId, resources: newResources })
    const state = reducer(initialStateWithSections, action)
    expect(state.sections[0].resources[0].resource._id).toEqual('r2')
  })

  it('should update a resource correctly with updateResource', () => {
    const sectionId = '1'
    const resourceId = 'r1'
    const initialStateWithSections = {
      ...initialState,
      sections: [
        {
          id: sectionId,
          resources: [{ resource: { _id: resourceId, title: 'Old Title' } }]
        }
      ]
    }
    const action = updateResource({
      sectionId,
      resourceId,
      resource: { title: 'New Title' }
    })
    const state = reducer(initialStateWithSections, action)
    expect(state.sections[0].resources[0].resource.title).toEqual('New Title')
  })

  it('should delete a resource correctly with deleteResource', () => {
    const sectionId = '1'
    const resourceId = 'r1'
    const initialStateWithSections = {
      ...initialState,
      sections: [
        { id: sectionId, resources: [{ resource: { _id: resourceId } }] }
      ]
    }
    const action = deleteResource({ sectionId, resourceId })
    const state = reducer(initialStateWithSections, action)
    expect(state.sections[0].resources.length).toBe(0)
  })

  it('should set resources availability correctly with setResourcesAvailability', () => {
    const sectionId = '1'
    const initialStateWithSections = {
      ...initialState,
      sections: [
        {
          id: sectionId,
          resources: [
            { resource: { _id: 'r1', availability: { status: 'Open' } } }
          ]
        }
      ]
    }
    const action = setResourcesAvailability(ResourcesAvailabilityEnum.ClosedAll)
    const state = reducer(initialStateWithSections, action)
    expect(state.resourcesAvailability).toBe(
      ResourcesAvailabilityEnum.ClosedAll
    )
    expect(state.sections[0].resources[0].resource.availability.status).toBe(
      'closed'
    )
  })
})
