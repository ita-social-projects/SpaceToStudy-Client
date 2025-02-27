import { titleToCamel } from './title-to-camel-case'

export function translateData<T extends { name: string }>(
  data: T[],
  translationKey: string,
  t: (key: string, options?: { defaultValue: string }) => string
): Array<T & { displayName: string }> {
  return data.map((item) => ({
    ...item,
    displayName: t(`${translationKey}.${titleToCamel(item.name)}`, {
      defaultValue: item.name
    })
  }))
}
