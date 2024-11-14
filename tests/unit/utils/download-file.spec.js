import { describe, it, vi, expect } from 'vitest'
import { downloadFile } from '~/utils/download-file'

describe('downloadFile', () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test-url')
    global.URL.revokeObjectURL = vi.fn(() => 'blob:http://localhost/test-url')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should download a file with the correct filename', async () => {
    const mockData = 'test file content'
    const mockResponse = Promise.resolve({
      data: mockData
    })

    const mockUrl = 'blob:http://localhost/test-url'
    const createObjectURLMock = vi
      .spyOn(window.URL, 'createObjectURL')
      .mockReturnValue(mockUrl)
    const revokeObjectURLMock = vi.spyOn(window.URL, 'revokeObjectURL')

    const link = {
      href: '',
      setAttribute: vi.fn(),
      click: vi.fn()
    }
    const appendChildMock = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => {})
    const removeChildMock = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => {})
    vi.spyOn(document, 'createElement').mockReturnValue(link)

    const fileName = 'test-file.txt'

    await downloadFile(mockResponse, fileName)

    expect(createObjectURLMock).toHaveBeenCalledOnce()
    expect(createObjectURLMock).toHaveBeenCalledWith(new Blob([mockData]))
    expect(link.setAttribute).toHaveBeenCalledWith('download', fileName)
    expect(link.click).toHaveBeenCalledOnce()
    expect(appendChildMock).toHaveBeenCalledWith(link)
    expect(removeChildMock).toHaveBeenCalledWith(link)

    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(revokeObjectURLMock).toHaveBeenCalledWith(mockUrl)
  })
})
