export async function downloadFile(response: Promise<Blob>, fileName: string) {
  const blobResponse = await response
  const url = window.URL.createObjectURL(blobResponse)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => window.URL.revokeObjectURL(url), 100)
}
