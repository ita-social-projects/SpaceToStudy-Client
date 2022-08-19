import { useState } from 'react'
import { filesValidation } from '~/utils/validation/files'

const useUpload = ({ initialState, initialError, maxQuantityFiles, filesTypes, maxAllFilesSize, maxFileSize }) => {
  const [files, setFiles] = useState(initialState)
  const [isDrag, setIsDrag] = useState(false)
  const [error, setError] = useState(initialError)
  
  const dragStart = (e) => {
    e.preventDefault()
    setIsDrag(true)
  }
  const dragLeave = (e) => {
    e.preventDefault()
    setIsDrag(false)
  }
  const dragDrop = (e) => {
    e.preventDefault()
    const newFiles = [...files, ...e.dataTransfer.files].slice(0, maxQuantityFiles)
    setFiles(newFiles)
    setIsDrag(false)
    setError(filesValidation(newFiles, maxFileSize, maxAllFilesSize, filesTypes))
  }
  
  const addFiles = (e) => {
    e.preventDefault()  
    const newFiles = [...files, ...e.target.files].slice(0, maxQuantityFiles)
    setFiles(newFiles)
    setError(filesValidation(newFiles, maxFileSize, maxAllFilesSize, filesTypes))
  }
  const deleteFile = (file) => {
    const newFiles = files.filter(item => item !== file)
    setFiles(newFiles)
    setError(filesValidation(newFiles, maxFileSize, maxAllFilesSize, filesTypes))
  }
  
  return {
    dragStart,
    dragLeave,
    dragDrop,
    addFiles,
    deleteFile,
    files,
    isDrag,
    error
  }
}

export default useUpload
