export function replaceEmptyStringsWithNull(
  obj: Record<string, unknown>
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === '' ? null : value
    ])
  )
}
