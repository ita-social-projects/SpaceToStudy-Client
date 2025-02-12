import { titleToCamel } from './title-to-camel-case'
import { ServiceFunctionNew } from '~/types'

export async function fetchAndTranslateData<T extends { name: string }>(
  serviceMethod: ServiceFunctionNew<T[]>,
  translationKey: string,
  t: (key: string, options?: { defaultValue: string }) => string
): Promise<Array<T & { displayName: string }>> {
  try {
    const response = await serviceMethod()
    const translatedData = response.map((item) => ({
      ...item,
      displayName: t(`${translationKey}.${titleToCamel(item.name)}`, {
        defaultValue: item.name
      })
    }))
    return translatedData
  } catch (error: unknown) {
    console.error(`Error fetching ${translationKey}:`, error)
    return []
  }
}
