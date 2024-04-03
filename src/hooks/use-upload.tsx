import { ChangeEvent, DragEvent, useState } from 'react'
import { filesValidation } from '~/utils/validations/files'
import { AddDocuments, UploadFileEmitter } from '~/types'

type UseUpload = {
  files: File[]
  validationData: AddDocuments
  emitter: UploadFileEmitter
}

const useUpload = ({ files, validationData, emitter }: UseUpload) => {
  const [isDrag, setIsDrag] = useState(false)

  const dragStart = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setIsDrag(true)
  }
  const dragLeave = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setIsDrag(false)
  }
  const dragDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    const newFiles = [...files, ...event.dataTransfer.files].slice(
      0,
      validationData.maxQuantityFiles
    )
    const error = filesValidation(newFiles, validationData) ?? ''
    setIsDrag(false)
    const filesForEmitter = error ? files : newFiles
    emitter({ files: filesForEmitter, error })
  }

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const newFiles = [...files, ...(event.target.files ?? [])]
    const error = filesValidation(newFiles, validationData) ?? ''
    const filesForEmitter = error ? files : newFiles
    emitter({ files: filesForEmitter, error })
  }

  const deleteFile = (file: File) => {
    const newFiles = files.filter((item) => item !== file)
    emitter({
      files: newFiles,
      error: filesValidation(newFiles, validationData) ?? ''
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
