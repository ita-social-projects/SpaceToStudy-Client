import { useState } from 'react'
import { filesValidation } from '~/utils/validations/files'

const useUpload = ({ initialState, initialError, validationData }) => {
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
    const newFiles = [...files, ...e.dataTransfer.files].slice(0, validationData.maxQuantityFiles)
    const error = filesValidation(newFiles, validationData)
    setIsDrag(false)
    if (!error) {
      setFiles(newFiles)
    }
    setError(error)
  }

  const addFiles = (e) => {
    e.preventDefault()
    const newFiles = [...files, ...e.target.files].slice(0, validationData.maxQuantityFiles)
    const error = filesValidation(newFiles, validationData)
    if (!error) {
      setFiles(newFiles)
    }
    setError(error)
  }
  const deleteFile = (file) => {
    const newFiles = files.filter((item) => item !== file)
    setFiles(newFiles)
    setError(filesValidation(newFiles, validationData))
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
