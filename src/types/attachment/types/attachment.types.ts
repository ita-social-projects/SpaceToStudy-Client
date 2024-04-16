export type UploadFileEmitterArgs = {
  files: File[]
  error: string
}

export type UploadFileEmitter = (args: UploadFileEmitterArgs) => void
