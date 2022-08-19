import { act, renderHook } from '@testing-library/react-hooks'
import useUpload from '~/hooks/use-upload'

const filesTypes = ['application/pdf']
const initialState = []
const initialError = undefined
const maxAllFilesSize = 10000
const maxFileSize = 100
const fakeFile = new File(['certificate'], 'test-file.png', { type: 'application/pdf' })
const getFakeTestEvent = (fakeFile) => (
  {
    preventDefault: jest.fn(),
    dataTransfer: { files: [fakeFile] },
    target: { files: [fakeFile] }
  })

describe('useUpload custom hook test without errors', () => {

  it('should have initial values', () => {
    const { result } = renderHook(() => useUpload({ initialState, initialError, filesTypes }))

    expect(typeof result.current.dragStart).toBe('function')
    expect(typeof result.current.dragLeave).toBe('function')
    expect(typeof result.current.dragDrop).toBe('function')
    expect(typeof result.current.addFiles).toBe('function')
    expect(typeof result.current.deleteFile).toBe('function')

    expect(result.current.files).toEqual([])
    expect(result.current.error).toEqual(undefined)
    expect(result.current.isDrag).toEqual(false)
  })

  it('should change isDrag value to true after dragStart', () => {
    const { result } = renderHook(() => useUpload({ initialState, initialError, filesTypes }))
    
    act(() => result.current.dragStart(getFakeTestEvent(fakeFile)))

    expect(result.current.isDrag).toEqual(true)
  })
    
  it('should change isDrag value to true after dragStart and to false after dragStart', () => {
    const { result } = renderHook(() => useUpload({ initialState, initialError, filesTypes }))
    
    act(() => result.current.dragStart(getFakeTestEvent(fakeFile)))
    expect(result.current.isDrag).toEqual(true)
    
    act(() => result.current.dragLeave(getFakeTestEvent(fakeFile)))
    expect(result.current.isDrag).toEqual(false)
  })
  
  // it('should change drop fake file', () => {
  //   const { result } = renderHook(() => useUpload({ initialState, initialError, filesTypes, maxAllFilesSize, maxFileSize }))
    
  //   act(() => result.current.dragDrop(getFakeTestEvent(fakeFile)))

  //   expect(result.current.files).toHaveLength(1)
  // })
    
  // it('should add fake file', () => {
  //   const { result } = renderHook(() => useUpload({ initialState, initialError, filesTypes, maxAllFilesSize, maxFileSize }))
    
  //   act(() => result.current.addFiles(getFakeTestEvent(fakeFile)))

  //   expect(result.current.files).toHaveLength(1)
  // })
    
  it('should add fake file and delete', () => {
    const initialState = [fakeFile]
    const { result } = renderHook(() => useUpload({ initialState, initialError, filesTypes, maxAllFilesSize, maxFileSize }))
    
    act(() => result.current.deleteFile(fakeFile))

    expect(result.current.files).toHaveLength(0)
  })
    
})
