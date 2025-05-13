import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { translateData } from '~/utils/translate-data'

const useTranslate = <T extends { name: string }>(entity: string) => {
  const { t } = useTranslation()

  return useCallback(
    (data: T[]) => {
      return translateData(data, entity, t)
    },
    [entity, t]
  )
}

export default useTranslate
