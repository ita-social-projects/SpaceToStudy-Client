import {
  countActiveOfferFilters,
  countActiveCourseFilters
} from '~/utils/count-active-filters'

const mockedDefaultFilters = {
  category: '',
  subject: '',
  title: '',
  page: 1,
  search: 'search',
  price: [1, 2]
}

const activeOfferIgnoredFields = {
  sort: '',
  authorRole: '',
  categoryId: '',
  subjectId: '',
  page: ''
}

const activeCourseIgnoredFields = {
  sort: '',
  page: ''
}

describe('countActiveOfferFilters', () => {
  it("Should return 0 if there aren't search params", () => {
    const mockedSearchParams = new URLSearchParams({})
    const count = countActiveCourseFilters(
      mockedSearchParams,
      mockedDefaultFilters
    )
    expect(count).toBe(0)
  })

  it('Should not count ignored fields', () => {
    const mockedSearchParams = new URLSearchParams({
      ...activeOfferIgnoredFields,
      title: 'title counts'
    })
    const count = countActiveOfferFilters(
      mockedSearchParams,
      mockedDefaultFilters
    )
    expect(count).toBe(1)
  })

  it('Should not count default price', () => {
    const mockedSearchParams = new URLSearchParams({
      price: [1, 2],
      title: 'title counts'
    })
    const count = countActiveOfferFilters(
      mockedSearchParams,
      mockedDefaultFilters
    )
    expect(count).toBe(1)
  })

  it('Should count search params that are not equal to default filter params', () => {
    const mockedSearchParams = new URLSearchParams({
      title: 'title counts',
      page: 1,
      search: 'search'
    })
    const count = countActiveOfferFilters(
      mockedSearchParams,
      mockedDefaultFilters
    )
    expect(count).toBe(1)
  })
})

describe('countActiveCourseFilters', () => {
  it('Should not count ignored fields', () => {
    const mockedSearchParams = new URLSearchParams(activeCourseIgnoredFields)
    const count = countActiveOfferFilters(
      mockedSearchParams,
      mockedDefaultFilters
    )
    expect(count).toBe(0)
  })

  it('Should return correct count of filters', () => {
    const mockedSearchParams = new URLSearchParams({
      foo: 'bar',
      title: 'title counts',
      subject: 'subject counts'
    })

    const count = countActiveCourseFilters(
      mockedSearchParams,
      mockedDefaultFilters
    )
    expect(count).toBe(2)
  })
})
