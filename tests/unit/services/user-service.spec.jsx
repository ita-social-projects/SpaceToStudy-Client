import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { userService } from '~/services/user-service'

const userId = '6255bc080a75adf9223df444'
const userRole = 'admin'
const userIds = ['6255bc080a75adf9223df444', '6255bc080a75adf443d7644']

const userDataMock = {
  _id: userId,
  role: [userRole],
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  categories: [
    {
      _id: '6255bc080a75adf9223df444',
      name: 'Languages'
    },
    {
      _id: '6255bc080a75adf443d7644',
      name: 'Biology'
    }
  ],
  totalReviews: 10,
  averageRating: 4.5,
  nativeLanguage: 'english',
  address: {
    country: 'The USA',
    city: 'California'
  },
  education: 'KNPU H.S. Skovoroda',
  photo: 'john-doe-photo.jpg',
  isEmailConfirmed: true,
  isFirstLogin: true,
  lastLogin: '2022-09-02T11:59:53.243+00:00',
  bookmarkedOffers: [],
  createdAt: '2021-04-09T11:34:53.243+00:00',
  updatedAt: '2022-09-02T11:59:53.243+00:00'
}

describe('userService tests', () => {
  it('should make a GET request to the correct URL', async () => {
    const options = { limit: 5, skip: 0 }
    mockAxiosClient.onGet(URLs.users.get, { params: options }).reply(200, [])

    await userService.getUsers(options)

    expect(mockAxiosClient.history.get[0].url).toBe(URLs.users.get)
  })
  it('should return an array of users', async () => {
    const users = [userDataMock]
    mockAxiosClient.onGet(URLs.users.get).reply(200, users)

    const response = await userService.getUsers({})

    expect(response.data).toEqual(users)
  })

  it('should return a user by userId and userRole', async () => {
    mockAxiosClient
      .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
      .reply(200, userDataMock)

    const result = await userService.getUserById(userId, userRole)

    expect(result.status).toEqual(200)
    expect(result.data).toEqual(userDataMock)
  })

  it('should delete a user by userId', async () => {
    mockAxiosClient.onDelete(`${URLs.users.get}/${userId}`).reply(204, null)

    const result = await userService.deleteUser(userId)

    expect(result.status).toEqual(204)
    expect(result.data).toBeNull()
  })

  it('should delete multiple users by userIds', async () => {
    mockAxiosClient.onPost(URLs.users.delete, userIds).reply(204, null)

    const result = await userService.deleteUsers(userIds)

    expect(result.status).toEqual(204)
    expect(result.data).toBeNull()
  })
})
