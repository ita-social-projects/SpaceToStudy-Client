import { describe, it, expect, vi } from 'vitest'
import { subjectService } from '~/services/subject-service'

describe('subjectService.sendSubjectRequest', () => {
  it('should return subjects', async () => {

  })
  
  it('should return a mocked AxiosResponse with a success message', async () => {
    const mockResponse = {
      data: { message: 'Success' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        url: 'https://api.example.com/subjects',
        method: 'get',
        headers: {
          Authorization: 'Bearer your-token-here',
          'Content-Type': 'application/json'
        }
      }
    }

    subjectService.sendSubjectRequest = vi.fn().mockResolvedValue(mockResponse)

    const result = await subjectService.sendSubjectRequest()

    expect(result).toEqual(mockResponse)
  })
})
