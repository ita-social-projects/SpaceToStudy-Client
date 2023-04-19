import { useState } from 'react'
import { filesValidation } from '~/utils/validations/files'

const useUpload = ({ files, validationData, emitter }) => {
  const [isDrag, setIsDrag] = useState(false)

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
    const newFiles = [...files, ...e.dataTransfer.files].slice(
      0,
      validationData.maxQuantityFiles
    )
    const error = filesValidation(newFiles, validationData)
    setIsDrag(false)
    const filesForEmitter = error ? files : newFiles
    emitter({ files: filesForEmitter, error })
  }

  const addFiles = (e) => {
    e.preventDefault()
    const newFiles = [...files, ...e.target.files].slice(
      0,
      validationData.maxQuantityFiles
    )
    const error = filesValidation(newFiles, validationData)
    const filesForEmitter = error ? files : newFiles
    emitter({ files: filesForEmitter, error })
  }

  const deleteFile = (file) => {
    const newFiles = files.filter((item) => item !== file)
    emitter({
      files: newFiles,
      error: filesValidation(newFiles, validationData)
    })
  }

  return {
    dragStart,
    dragLeave,
    dragDrop,
    addFiles,
    deleteFile,
    isDrag
  }
}

export default useUpload
