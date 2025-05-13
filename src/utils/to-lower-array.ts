export function toLowerArray(
  value: string | string[] | undefined | null
): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => v.toLowerCase())
  }

  if (typeof value === 'string') {
    return [value.toLowerCase()]
  }

  return []
}
