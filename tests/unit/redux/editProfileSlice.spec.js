import reducer, {
  setCity,
  setCountry,
  setFirstName,
  setLastName,
  setProfessionalSummary,
  setNativeLanguage,
  setVideoLink,
  setPhoto,
  setCategories,
  setEducation,
  setWorkExperience,
  setScientificActivities,
  setAwards,
  setIsOfferStatusNotification,
  setIsChatNotification,
  setIsSimilarOffersNotification,
  setIsEmailNotification,
  addCategory,
  deleteCategory,
  editCategory,
  addSubjectToCategory,
  removeSubjectFromCategory
} from '~/redux/features/editProfileSlice'

const initialState = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  professionalSummary: '',
  nativeLanguage: '',
  videoLink: '',
  photo: null,
  categories: [],
  education: '',
  workExperience: '',
  scientificActivities: '',
  awards: '',
  isOfferStatusNotification: false,
  isChatNotification: false,
  isSimilarOffersNotification: false,
  isEmailNotification: false
}

const mockedCategories = [
  {
    _id: '1',
    isDeletionBlocked: false,
    category: {
      _id: 'category_001',
      name: 'Music'
    },
    subjects: [
      {
        _id: 'subject_001',
        name: 'Violin'
      },
      {
        _id: 'subject_002',
        name: 'Voice training'
      }
    ]
  },
  {
    _id: '2',
    isDeletionBlocked: false,
    category: {
      _id: 'category_002',
      name: 'Marketing'
    },
    subjects: [
      {
        _id: 'subject_003',
        name: 'Digital marketing'
      },
      {
        _id: 'subject_004',
        name: 'Content marketing'
      }
    ]
  }
]

const createState = (overrides) => ({
  ...initialState,
  ...overrides
})

describe('editProfileSlice test', () => {
  afterEach(() => vi.clearAllMocks())

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set firstName correctly', () => {
    const expectedState = createState({ firstName: 'test firstName' })

    expect(reducer(undefined, setFirstName('test firstName'))).toEqual(
      expectedState
    )
  })

  it('should set lastName correctly', () => {
    const expectedState = createState({ lastName: 'test lastName' })

    expect(reducer(undefined, setLastName('test lastName'))).toEqual(
      expectedState
    )
  })

  it('should set country correctly', () => {
    const expectedState = createState({ country: 'test country' })

    expect(reducer(undefined, setCountry('test country'))).toEqual(
      expectedState
    )
  })

  it('should set city correctly', () => {
    const expectedState = createState({ city: 'test city' })

    expect(reducer(undefined, setCity('test city'))).toEqual(expectedState)
  })

  it('should set professionalSummary correctly', () => {
    const expectedState = createState({
      professionalSummary: 'test professionalSummary'
    })

    expect(
      reducer(undefined, setProfessionalSummary('test professionalSummary'))
    ).toEqual(expectedState)
  })

  it('should set nativeLanguage correctly', () => {
    const expectedState = createState({
      nativeLanguage: 'test language'
    })

    expect(reducer(undefined, setNativeLanguage('test language'))).toEqual(
      expectedState
    )
  })

  it('should set videoLink correctly', () => {
    const expectedState = createState({ videoLink: 'test video link' })

    expect(reducer(undefined, setVideoLink('test video link'))).toEqual(
      expectedState
    )
  })

  it('should set photo correctly', () => {
    const expectedState = createState({ photo: 'test photo' })

    expect(reducer(undefined, setPhoto('test photo'))).toEqual(expectedState)
  })

  it('should set categories correctly', () => {
    const expectedState = createState({
      categories: mockedCategories
    })

    expect(reducer(undefined, setCategories(mockedCategories))).toEqual(
      expectedState
    )
  })

  it('should set education correctly', () => {
    const expectedState = createState({ education: 'test education' })

    expect(reducer(undefined, setEducation('test education'))).toEqual(
      expectedState
    )
  })

  it('should set workExperience correctly', () => {
    const expectedState = createState({
      workExperience: 'test work experience'
    })

    expect(
      reducer(undefined, setWorkExperience('test work experience'))
    ).toEqual(expectedState)
  })

  it('should set scientificActivities correctly', () => {
    const expectedState = createState({
      scientificActivities: 'test scientific activities'
    })

    expect(
      reducer(undefined, setScientificActivities('test scientific activities'))
    ).toEqual(expectedState)
  })

  it('should set awards correctly', () => {
    const expectedState = createState({ awards: 'test awards' })

    expect(reducer(undefined, setAwards('test awards'))).toEqual(expectedState)
  })

  it('should set isOfferStatusNotification correctly', () => {
    const expectedState = createState({
      isOfferStatusNotification: true
    })

    expect(reducer(undefined, setIsOfferStatusNotification(true))).toEqual(
      expectedState
    )
  })

  it('should set isChatNotification correctly', () => {
    const expectedState = createState({ isChatNotification: true })

    expect(reducer(undefined, setIsChatNotification(true))).toEqual(
      expectedState
    )
  })

  it('should set isSimilarOffersNotification correctly', () => {
    const expectedState = createState({
      isSimilarOffersNotification: true
    })

    expect(reducer(undefined, setIsSimilarOffersNotification(true))).toEqual(
      expectedState
    )
  })

  it('should set isEmailNotification correctly', () => {
    const expectedState = createState({ isEmailNotification: true })

    expect(reducer(undefined, setIsEmailNotification(true))).toEqual(
      expectedState
    )
  })

  it('should add new category', () => {
    const expectedState = createState({
      categories: [mockedCategories[0]]
    })

    expect(reducer(undefined, addCategory(mockedCategories[0]))).toEqual(
      expectedState
    )
  })

  it('should delete category', () => {
    const previousState = createState({ categories: mockedCategories })
    const expectedState = createState({ categories: [mockedCategories[1]] })

    expect(reducer(previousState, deleteCategory({ id: '1' }))).toEqual(
      expectedState
    )
  })

  it('should edit category', () => {
    const expectedCategories = [
      {
        _id: '1',
        isDeletionBlocked: true,
        category: {
          _id: 'category_001',
          name: 'Music'
        },
        subjects: [
          {
            _id: 'subject_001',
            name: 'Violin'
          },
          {
            _id: 'subject_002',
            name: 'Voice training'
          }
        ]
      },
      {
        _id: '2',
        isDeletionBlocked: false,
        category: {
          _id: 'category_002',
          name: 'Marketing'
        },
        subjects: [
          {
            _id: 'subject_003',
            name: 'Digital marketing'
          },
          {
            _id: 'subject_004',
            name: 'Content marketing'
          }
        ]
      }
    ]
    const categoryIdToEdit = '1'

    const previousState = createState({ categories: mockedCategories })
    const expectedState = createState({ categories: expectedCategories })

    expect(
      reducer(
        previousState,
        editCategory({
          id: categoryIdToEdit,
          field: 'isDeletionBlocked',
          value: true
        })
      )
    ).toEqual(expectedState)
  })

  it('should add subject to category', () => {
    const expectedCategories = [
      {
        _id: '1',
        isDeletionBlocked: false,
        category: {
          _id: 'category_001',
          name: 'Music'
        },
        subjects: [
          {
            _id: 'subject_001',
            name: 'Violin'
          },
          {
            _id: 'subject_002',
            name: 'Voice training'
          },
          {
            _id: 'subject_005',
            name: 'Piano'
          }
        ]
      },
      {
        _id: '2',
        isDeletionBlocked: false,
        category: {
          _id: 'category_002',
          name: 'Marketing'
        },
        subjects: [
          {
            _id: 'subject_003',
            name: 'Digital marketing'
          },
          {
            _id: 'subject_004',
            name: 'Content marketing'
          }
        ]
      }
    ]
    const categoryIdToEdit = '1'

    const previousState = createState({ categories: mockedCategories })
    const expectedState = createState({ categories: expectedCategories })

    expect(
      reducer(
        previousState,
        addSubjectToCategory({
          id: categoryIdToEdit,
          subject: { _id: 'subject_005', name: 'Piano' }
        })
      )
    ).toEqual(expectedState)
  })

  it('should remove subject from category', () => {
    const expectedCategories = [
      {
        _id: '1',
        isDeletionBlocked: false,
        category: {
          _id: 'category_001',
          name: 'Music'
        },
        subjects: [
          {
            _id: 'subject_001',
            name: 'Violin'
          }
        ]
      },
      {
        _id: '2',
        isDeletionBlocked: false,
        category: {
          _id: 'category_002',
          name: 'Marketing'
        },
        subjects: [
          {
            _id: 'subject_003',
            name: 'Digital marketing'
          },
          {
            _id: 'subject_004',
            name: 'Content marketing'
          }
        ]
      }
    ]
    const categoryIdToEdit = '1'
    const subjectIdToRemove = 'subject_002'

    const previousState = createState({ categories: mockedCategories })
    const expectedState = createState({ categories: expectedCategories })

    expect(
      reducer(
        previousState,
        removeSubjectFromCategory({
          id: categoryIdToEdit,
          subjectId: subjectIdToRemove
        })
      )
    ).toEqual(expectedState)
  })
})
