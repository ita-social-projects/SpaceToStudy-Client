import { URLs } from '~/constants/request'
import { AuthService } from '~/services/auth-service'
import { mockAxiosClient } from '~tests/test-utils'

const userId = 'fake-user-id'
const params = {
  password: 'new-password',
  currentPassword: 'current-password'
}

const mockResponse = { data: null }

describe('AuthService', () => {
  it('should call changePassword with userId and params and return data', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.changePassword}/${userId}`)
      .reply(200, mockResponse)

    const response = await AuthService.changePassword(userId, params)

    expect(response.status).toEqual(200)
    expect(response.data).toEqual(mockResponse)
  })
})
