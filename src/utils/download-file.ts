import { AxiosResponse } from 'axios'

export async function downloadFile(
  response: Promise<AxiosResponse>,
  fileName: string
) {
  const blobResponse = await response
  const url = window.URL.createObjectURL(new Blob([blobResponse.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => window.URL.revokeObjectURL(url), 100)
}
