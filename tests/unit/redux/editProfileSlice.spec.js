import { configureStore } from '@reduxjs/toolkit'
import reducer, {
  setField,
  updateValidityStatus,
  updateProfileData,
  addCategory,
  deleteCategory,
  editCategory,
  updateCategory,
  addSubjectToCategory,
  removeSubjectFromCategory,
  fetchUserById,
  updateUser
} from '~/redux/features/editProfileSlice'
import { UserRoleEnum } from '~/types'
import { mockAxiosClient } from '~tests/test-utils'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { LoadingStatusEnum } from '~/redux/redux.constants'

const userDataMock = {
  firstName: 'John',
  lastName: 'Doe',
  address: { country: 'USA', city: 'New York' },
  professionalSummary: 'Summary',
  nativeLanguage: 'English',
  photo: {
    src: 'url',
    name: 'profile_photo'
  },
  videoLink: { [UserRoleEnum.Tutor]: 'link', [UserRoleEnum.Student]: '' },
  mainSubjects: { [UserRoleEnum.Tutor]: [], [UserRoleEnum.Student]: [] },
  professionalBlock: {
    education: 'Education',
    workExperience: 'Experience',
    scientificActivities: 'Activities',
    awards: 'Awards'
  },
  notificationSettings: {
    isOfferStatusNotification: false,
    isChatNotification: false,
    isSimilarOffersNotification: false,
    isEmailNotification: false
  }
}

const expectedUserData = {
  firstName: 'John',
  lastName: 'Doe',
  country: 'USA',
  city: 'New York',
  professionalSummary: 'Summary',
  nativeLanguage: 'English',
  videoLink: { [UserRoleEnum.Tutor]: 'link', [UserRoleEnum.Student]: '' },
  photo: {
    src: 'url',
    name: 'profile_photo'
  },
  categories: { [UserRoleEnum.Tutor]: [], [UserRoleEnum.Student]: [] },
  professionalBlock: {
    education: 'Education',
    workExperience: 'Experience',
    scientificActivities: 'Activities',
    awards: 'Awards'
  },
  notificationSettings: {
    isOfferStatusNotification: false,
    isChatNotification: false,
    isSimilarOffersNotification: false,
    isEmailNotification: false
  },
  loading: LoadingStatusEnum.Fulfilled,
  error: null,
  tabValidityStatus: {
    profileTab: true,
    professionalInfoTab: true,
    notificationTab: true
  }
}

const initialState = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  professionalSummary: '',
  nativeLanguage: '',
  videoLink: { [UserRoleEnum.Tutor]: '', [UserRoleEnum.Student]: '' },
  photo: null,
  categories: { [UserRoleEnum.Tutor]: [], [UserRoleEnum.Student]: [] },
  professionalBlock: {
    education: '',
    workExperience: '',
    scientificActivities: '',
    awards: ''
  },
  notificationSettings: {
    isOfferStatusNotification: false,
    isChatNotification: false,
    isSimilarOffersNotification: false,
    isEmailNotification: false
  },
  loading: LoadingStatusEnum.Idle,
  error: null,
  tabValidityStatus: {
    profileTab: true,
    professionalInfoTab: true,
    notificationTab: true
  },
  bookmarkedOffers: []
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
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        editProfile: reducer
      }
    })
    vi.clearAllMocks()
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set firstName correctly', () => {
    const expectedState = createState({ firstName: 'test firstName' })

    expect(
      reducer(
        undefined,
        setField({ field: 'firstName', value: 'test firstName' })
      )
    ).toEqual(expectedState)
  })

  it('should set lastName correctly', () => {
    const expectedState = createState({ lastName: 'test lastName' })

    expect(
      reducer(
        undefined,
        setField({ field: 'lastName', value: 'test lastName' })
      )
    ).toEqual(expectedState)
  })

  it('should set country correctly', () => {
    const expectedState = createState({ country: 'test country' })

    expect(
      reducer(undefined, setField({ field: 'country', value: 'test country' }))
    ).toEqual(expectedState)
  })

  it('should set city correctly', () => {
    const expectedState = createState({ city: 'test city' })

    expect(
      reducer(undefined, setField({ field: 'city', value: 'test city' }))
    ).toEqual(expectedState)
  })

  it('should set professionalSummary correctly', () => {
    const expectedState = createState({
      professionalSummary: 'test professionalSummary'
    })

    expect(
      reducer(
        undefined,
        setField({
          field: 'professionalSummary',
          value: 'test professionalSummary'
        })
      )
    ).toEqual(expectedState)
  })

  it('should set nativeLanguage correctly', () => {
    const expectedState = createState({
      nativeLanguage: 'test language'
    })

    expect(
      reducer(
        undefined,
        setField({ field: 'nativeLanguage', value: 'test language' })
      )
    ).toEqual(expectedState)
  })

  it('should set videoLink correctly', () => {
    const expectedState = createState({ videoLink: 'test video link' })

    expect(
      reducer(
        undefined,
        setField({ field: 'videoLink', value: 'test video link' })
      )
    ).toEqual(expectedState)
  })

  it('should set photo correctly', () => {
    const expectedState = createState({ photo: 'test photo' })

    expect(
      reducer(undefined, setField({ field: 'photo', value: 'test photo' }))
    ).toEqual(expectedState)
  })

  it('should set categories correctly', () => {
    const expectedState = createState({
      categories: mockedCategories
    })

    expect(
      reducer(
        undefined,
        setField({ field: 'categories', value: mockedCategories })
      )
    ).toEqual(expectedState)
  })

  it('should set education correctly', () => {
    const expectedState = createState({ education: 'test education' })

    expect(
      reducer(
        undefined,
        setField({ field: 'education', value: 'test education' })
      )
    ).toEqual(expectedState)
  })

  it('should set workExperience correctly', () => {
    const expectedState = createState({
      workExperience: 'test work experience'
    })

    expect(
      reducer(
        undefined,
        setField({ field: 'workExperience', value: 'test work experience' })
      )
    ).toEqual(expectedState)
  })

  it('should set scientificActivities correctly', () => {
    const expectedState = createState({
      scientificActivities: 'test scientific activities'
    })

    expect(
      reducer(
        undefined,
        setField({
          field: 'scientificActivities',
          value: 'test scientific activities'
        })
      )
    ).toEqual(expectedState)
  })

  it('should set awards correctly', () => {
    const expectedState = createState({ awards: 'test awards' })

    expect(
      reducer(undefined, setField({ field: 'awards', value: 'test awards' }))
    ).toEqual(expectedState)
  })

  it('should set isOfferStatusNotification correctly', () => {
    const expectedState = createState({
      isOfferStatusNotification: true
    })

    expect(
      reducer(
        undefined,
        setField({ field: 'isOfferStatusNotification', value: true })
      )
    ).toEqual(expectedState)
  })

  it('should set isChatNotification correctly', () => {
    const expectedState = createState({ isChatNotification: true })

    expect(
      reducer(undefined, setField({ field: 'isChatNotification', value: true }))
    ).toEqual(expectedState)
  })

  it('should set isSimilarOffersNotification correctly', () => {
    const expectedState = createState({
      isSimilarOffersNotification: true
    })

    expect(
      reducer(
        undefined,
        setField({ field: 'isSimilarOffersNotification', value: true })
      )
    ).toEqual(expectedState)
  })

  it('should set isEmailNotification correctly', () => {
    const expectedState = createState({ isEmailNotification: true })

    expect(
      reducer(
        undefined,
        setField({ field: 'isEmailNotification', value: true })
      )
    ).toEqual(expectedState)
  })

  it('should set profile tab validity correctly', () => {
    const expectedState = createState({
      tabValidityStatus: {
        profileTab: false,
        professionalInfoTab: true,
        notificationTab: true
      }
    })

    expect(
      reducer(
        undefined,
        updateValidityStatus({ tab: 'profileTab', value: false })
      )
    ).toEqual(expectedState)
  })

  it('should set profile tab validity correctly', () => {
    const expectedState = createState({
      city: 'city',
      country: 'country',
      firstName: 'firstName',
      lastName: 'lastName',
      nativeLanguage: 'nativeLanguage',
      photo: 'photo',
      professionalSummary: 'professionalSummary',
      videoLink: 'videoLink'
    })

    expect(
      reducer(
        undefined,
        updateProfileData({
          city: 'city',
          country: 'country',
          firstName: 'firstName',
          lastName: 'lastName',
          nativeLanguage: 'nativeLanguage',
          photo: 'photo',
          professionalSummary: 'professionalSummary',
          videoLink: 'videoLink'
        })
      )
    ).toEqual(expectedState)
  })

  it('should add new category', () => {
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[0]],
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        undefined,
        addCategory({
          category: mockedCategories[0],
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should not add category if it is already added', () => {
    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[0]],
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[0]],
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        addCategory({
          category: mockedCategories[0],
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should update category', () => {
    const updatedCategory = {
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
    }
    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[0]],
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [updatedCategory],
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        updateCategory({
          category: updatedCategory,
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should delete category', () => {
    const categoryIdToDelete = '1'
    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[1]],
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        deleteCategory({ id: categoryIdToDelete, userRole: UserRoleEnum.Tutor })
      )
    ).toEqual(expectedState)
  })

  it('should not delete category if it does not exist', () => {
    const categoryIdToDelete = '2'
    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[0]],
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: [mockedCategories[0]],
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        deleteCategory({ id: categoryIdToDelete, userRole: UserRoleEnum.Tutor })
      )
    ).toEqual(expectedState)
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

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: expectedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        editCategory({
          id: categoryIdToEdit,
          field: 'isDeletionBlocked',
          value: true,
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should not edit category if it does not exist', () => {
    const categoryIdToEdit = '4'

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        editCategory({
          id: categoryIdToEdit,
          field: 'isDeletionBlocked',
          value: true,
          userRole: UserRoleEnum.Tutor
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

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: expectedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        addSubjectToCategory({
          id: categoryIdToEdit,
          subject: { _id: 'subject_005', name: 'Piano' },
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should not add subject to category if category does not exist', () => {
    const categoryIdToEdit = '4'

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        addSubjectToCategory({
          id: categoryIdToEdit,
          subject: { _id: 'subject_005', name: 'Piano' },
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should not add subject to category if subject is already added', () => {
    const categoryIdToEdit = '1'

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        addSubjectToCategory({
          id: categoryIdToEdit,
          subject: { _id: 'subject_001', name: 'Violin' },
          userRole: UserRoleEnum.Tutor
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

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: expectedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        removeSubjectFromCategory({
          id: categoryIdToEdit,
          subjectId: subjectIdToRemove,
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should not remove subject from category if category does not exist', () => {
    const categoryIdToEdit = '4'
    const subjectIdToRemove = 'subject_002'

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        removeSubjectFromCategory({
          id: categoryIdToEdit,
          subjectId: subjectIdToRemove,
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('should not remove subject from category if subject does not exist', () => {
    const categoryIdToEdit = '1'
    const subjectIdToRemove = 'subject_009'

    const previousState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })
    const expectedState = createState({
      categories: {
        [UserRoleEnum.Tutor]: mockedCategories,
        [UserRoleEnum.Student]: []
      }
    })

    expect(
      reducer(
        previousState,
        removeSubjectFromCategory({
          id: categoryIdToEdit,
          subjectId: subjectIdToRemove,
          userRole: UserRoleEnum.Tutor
        })
      )
    ).toEqual(expectedState)
  })

  it('fetchUserById should handle fulfilled state', async () => {
    const userId = '123'
    const role = UserRoleEnum.Tutor
    const isEdit = true

    mockAxiosClient
      .onGet(createUrlPath(URLs.users.get, userId, { role: role, isEdit }))
      .reply(200, userDataMock)

    await store.dispatch(fetchUserById({ userId, role, isEdit }))
    expect(store.getState().editProfile).toEqual(expectedUserData)
  })

  it('fetchUserById should handle rejected state', async () => {
    const userId = '123'
    const role = UserRoleEnum.Tutor
    const isEdit = true
    const error = new Error('Failed to fetch user')
    const errorCode = 'USER_NOT_FOUND'
    error.code = errorCode
    const expectedState = createState({
      loading: LoadingStatusEnum.Rejected,
      error: errorCode
    })

    mockAxiosClient
      .onGet(createUrlPath(URLs.users.get, userId, { role: role, isEdit }))
      .reply(404, error)

    await store.dispatch(fetchUserById({ userId, role, isEdit }))
    expect(store.getState().editProfile).toEqual(expectedState)
  })

  it('updateUser should handle fulfilled state', async () => {
    const userId = '123'
    const params = { firstName: 'new firstname' }
    const expectedState = createState({ loading: LoadingStatusEnum.Fulfilled })

    mockAxiosClient
      .onPatch(createUrlPath(URLs.users.update, userId), params)
      .reply(200)

    await store.dispatch(updateUser({ userId, params }))
    expect(store.getState().editProfile).toEqual(expectedState)
  })

  it('updateUser should handle rejected state', async () => {
    const userId = '123'
    const params = { firstName: 'new firstname' }
    const error = new Error('Failed to update user')
    const errorCode = 'USER_NOT_FOUND'
    error.code = errorCode
    const expectedState = createState({
      loading: LoadingStatusEnum.Rejected,
      error: errorCode
    })

    mockAxiosClient
      .onPatch(createUrlPath(URLs.users.update, userId), params)
      .reply(404, error)

    await store.dispatch(updateUser({ userId, params }))
    expect(store.getState().editProfile).toEqual(expectedState)
  })
})
