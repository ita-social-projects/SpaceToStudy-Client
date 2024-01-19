import { expect } from 'vitest'

import { customOptions } from '~/utils/course-custom-options'

const mockCategories = [
  { _id: '6255bc080a75adf9223df444', name: 'Category1' },
  { _id: '6255bc080a75adf9223df445', name: 'Category2' }
]

const userOptionsMock = ['Category1', 'Category3']

describe('CourseCustomOptions', () => {
  it('Should return array with title property', () => {
    const result = customOptions(mockCategories, userOptionsMock)

    expect(result[0].title).toEqual('course.yourCategories')
    expect(result[1].title).toEqual('course.otherCategories')
  })
})
