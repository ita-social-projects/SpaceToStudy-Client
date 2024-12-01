import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { titleToCamel } from './title-to-camel-case'

export async function fetchAndTranslateData<T extends { name: string }>(
  serviceMethod: () => Promise<AxiosResponse<T[]>>,
  translationKey: string,
  t: (key: string, options?: { defaultValue: string }) => string
): Promise<AxiosResponse<Array<T & { displayName: string }>>> {
  try {
    const response = await serviceMethod()
    const translatedData = response.data.map((item) => ({
      ...item,
      displayName: t(`${translationKey}.${titleToCamel(item.name)}`, {
        defaultValue: item.name
      })
    }))
    return { ...response, data: translatedData }
  } catch (error: unknown) {
    console.error(`Error fetching ${translationKey}:`, error)
    return {
      data: [],
      status: 500,
      statusText: 'Error',
      headers: new AxiosHeaders(),
      config: {} as InternalAxiosRequestConfig
    } as AxiosResponse<Array<T & { displayName: string }>>
  }
}
