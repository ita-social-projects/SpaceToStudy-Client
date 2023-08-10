export const convertBytesToProperSize = (bytes?: number) => {
  const kilobyte = 1024
  const megabyte = kilobyte * 1024

  if (!bytes) {
    return ''
  }

  if (bytes >= megabyte) {
    return `${(bytes / megabyte).toFixed(1) + ' MB'}`
  } else if (bytes >= kilobyte) {
    return `${(bytes / kilobyte).toFixed(1) + ' KB'}`
  }
  return bytes.toString() + ' B'
}
