import { vi } from 'vitest'
import { userProfileLoader } from '~/router/constants/loaders'
import { userProfile } from '~/router/constants/crumbs'
import { userService } from '~/services/user-service'
import { queryClient } from '~/plugins/queryClient'
import { URLs } from '~/constants/request'

const userId = '6748e02e1490ebab736edb94'
const userRole = 'tutor'
const mockUserData = {
  _id: userId,
  role: userRole,
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@gmail.com'
}

const request = {
  url: `https://mockurl${URLs.users.getUserById.replace(':id', userId)}?role=${userRole}`
}
const params = { id: userId }

vi.mock('~/plugins/queryClient', () => ({
  queryClient: {
    prefetchQuery: vi.fn(),
    getQueryData: vi.fn()
  }
}))

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserByIdWithBaseService: vi.fn()
  }
}))

describe('userProfileLoader and userProfile tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call prefetchQuery with correct parameters', async () => {
    await userProfileLoader({ request, params })

    expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
      queryKey: ['user', userId, userRole],
      queryFn: expect.any(Function),
      staleTime: Infinity
    })
  })

  it('should call getUserByIdWithBaseService with correct parameters', async () => {
    await userProfileLoader({ request, params })

    const prefetchQueryCall = vi.mocked(queryClient.prefetchQuery).mock
      .calls[0][0]
    await prefetchQueryCall.queryFn()

    expect(userService.getUserByIdWithBaseService).toHaveBeenCalledWith(
      userId,
      userRole
    )
  })

  it('should call getUserByIdWithBaseService without id', async () => {
    await userProfileLoader({ request, params: { id: undefined } })

    const prefetchQueryCall = vi.mocked(queryClient.prefetchQuery).mock
      .calls[0][0]
    await prefetchQueryCall.queryFn()

    expect(userService.getUserByIdWithBaseService).toHaveBeenCalledWith(
      '',
      userRole
    )
  })

  it('should retrieve user data from queryClient with correct query key', () => {
    vi.mocked(queryClient.getQueryData).mockReturnValue(mockUserData)
    userProfile({ _id: userId, role: userRole })

    expect(queryClient.getQueryData).toHaveBeenCalledWith([
      'user',
      userId,
      userRole
    ])
  })
})
