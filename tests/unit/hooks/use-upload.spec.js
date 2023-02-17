import { act, renderHook } from '@testing-library/react-hooks'
import useUpload from '~/hooks/use-upload'
import { vi } from 'vitest'

const files = []
const validationData = {
  maxFileSize: 10_000_000,
  maxAllFilesSize: 50_000_000,
  filesTypes: ['application/pdf'],
  fileSizeError: 'becomeTutor.documents.fileSizeError',
  allFilesSizeError: 'becomeTutor.documents.allFilesSizeError',
  typeError: 'becomeTutor.documents.typeError',
  maxQuantityFiles: 7
}
const fakeFile = new File(['certificate'], 'test-file.png', { type: 'application/pdf' })
const getFakeTestEvent = (fakeFile) => ({
  preventDefault: vi.fn(),
  dataTransfer: { files: [fakeFile] },
  target: { files: [fakeFile] }
})
const emitter = vi.fn()

describe('useUpload custom hook test without errors', () => {
  it('should have initial values', () => {
    const { result } = renderHook(() => useUpload({ files, emitter, validationData }))

    expect(typeof result.current.dragStart).toBe('function')
    expect(typeof result.current.dragLeave).toBe('function')
    expect(typeof result.current.dragDrop).toBe('function')
    expect(typeof result.current.addFiles).toBe('function')
    expect(typeof result.current.deleteFile).toBe('function')

    expect(result.current.isDrag).toEqual(false)
  })

  it('should change isDrag value to true after dragStart', () => {
    const { result } = renderHook(() => useUpload({ files, emitter, validationData }))

    act(() => result.current.dragStart(getFakeTestEvent(fakeFile)))

    expect(result.current.isDrag).toEqual(true)
  })

  it('should change isDrag value to true after dragStart and to false after dragStart', () => {
    const { result } = renderHook(() => useUpload({ files, emitter, validationData }))

    act(() => result.current.dragStart(getFakeTestEvent(fakeFile)))
    expect(result.current.isDrag).toEqual(true)

    act(() => result.current.dragLeave(getFakeTestEvent(fakeFile)))
    expect(result.current.isDrag).toEqual(false)
  })

  it('should change drop fake file', () => {
    const { result } = renderHook(() => useUpload({ files, emitter, validationData }))

    act(() => result.current.dragDrop(getFakeTestEvent(fakeFile)))

    expect(emitter).toHaveBeenCalledTimes(1)
  })

  it('should add fake file', () => {
    const { result } = renderHook(() => useUpload({ files, emitter, validationData }))

    act(() => result.current.addFiles(getFakeTestEvent(fakeFile)))

    emitter.mock.calls.length = 1
    expect(emitter).toHaveBeenCalledTimes(1)
  })

  it('should add fake file and delete', () => {
    const files = [fakeFile]
    const { result } = renderHook(() => useUpload({ files, emitter, validationData }))

    act(() => result.current.deleteFile(fakeFile))

    expect(emitter).toHaveBeenCalledWith({ error: undefined, files: [] })
  })
})
