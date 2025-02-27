type ConvertStringsToNullable<T> = {
  [K in keyof T]: T[K] extends string ? string | null : T[K]
}

export const replaceEmptyStringsWithNull = <T extends Record<string, unknown>>(
  obj: T
) => {
  return Object.fromEntries(
    Object.entries(obj).map((entries) => {
      const [key, value] = entries as [keyof T, T[keyof T]]

      return [key, value === '' ? null : value]
    })
  ) as ConvertStringsToNullable<T>
}
