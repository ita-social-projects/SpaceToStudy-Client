type SearchParameterValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | undefined
  | Record<string, string | number | boolean | null | undefined>

const getSearchParametersEntries = (
  searchParameters: Record<string, SearchParameterValue>
) => {
  const searchParametersEntries: [
    string,
    string | number | boolean | null | undefined
  ][] = []

  for (const [searchParameterName, searchParameterValue] of Object.entries(
    searchParameters
  )) {
    if (Array.isArray(searchParameterValue)) {
      const entries = searchParameterValue.map((parameterValue, index) => {
        const searchParameterArrayKey = `${searchParameterName}[${index}]`

        return [searchParameterArrayKey, parameterValue] as [
          string,
          string | number | boolean
        ]
      })

      searchParametersEntries.push(...entries)
    } else if (typeof searchParameterValue === 'object') {
      for (const parameterKey in searchParameterValue) {
        const searchParameterObjectKey = `${searchParameterName}[${parameterKey}]`
        const searchParameterObjectValue = searchParameterValue[parameterKey]

        searchParametersEntries.push([
          searchParameterObjectKey,
          searchParameterObjectValue
        ])
      }
    } else {
      searchParametersEntries.push([searchParameterName, searchParameterValue])
    }
  }

  return searchParametersEntries
    .filter(([, value]) => {
      return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      )
    })
    .map(([key, value]) => [key, String(value)])
}

type ExtractDynamicParameters<Path extends string> =
  Path extends `${string}:${infer Parameter}/${infer Rest}`
    ? Parameter | ExtractDynamicParameters<`/${Rest}`>
    : Path extends `${string}:${infer Parameter}`
      ? Parameter
      : never

type Options<Path extends string> = {
  pathname: Path
  searchParameters?: Record<string, SearchParameterValue>
} & (ExtractDynamicParameters<Path> extends never
  ? {
      parameters?: never
    }
  : { parameters: Record<ExtractDynamicParameters<Path>, string> })

export const getFullUrl = <Path extends string>({
  parameters,
  pathname,
  searchParameters
}: Options<Path>) => {
  let resultUrl: string = pathname

  if (parameters) {
    for (const [parameterName, parameterValue] of Object.entries<string>(
      parameters
    )) {
      resultUrl = resultUrl.replace(`:${parameterName}`, parameterValue)
    }
  }

  if (!searchParameters) {
    return resultUrl
  }

  const searchParametersEntries = getSearchParametersEntries(searchParameters)

  const urlSearchParameters = new URLSearchParams(searchParametersEntries)

  return `${resultUrl}?${String(urlSearchParameters)}`
}
