import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'

import { levelsTranslationKeys } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { CategoryNameInterface, CreateOfferBlockProps } from '~/types'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'

const SpecializationBlock = <T extends CreateOfferData>({
  data,
  errors,
  handleBlur,
  handleNonInputValueChange
}: CreateOfferBlockProps<T>) => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)
  const { response: categoriesItems, loading: categoriesLoading } =
    useCategoriesNames()

  const { response: subjectsItems, loading: subjectsLoading } =
    useSubjectsNames({
      category: data.categoryId
    })

  const getValue = useCallback(
    (array: CategoryNameInterface[], key: keyof T) =>
      array.find((option) => option._id === data[key]) || null,
    [data]
  )

  const handleAutocompleteChange =
    (key: keyof Pick<T, 'categoryId' | 'subjectId'>) =>
    (_: React.ChangeEvent, value: CategoryNameInterface | null) => {
      handleNonInputValueChange(key, value?._id || '')
    }

  const getLabel = (option: CategoryNameInterface) => option.name || ''

  const isOptionEqualToValue = (
    option: CategoryNameInterface,
    value: CategoryNameInterface
  ) => option?._id === value?._id

  const levelOptions = levelsTranslationKeys.map((level) => t(level))

  return (
    <OrderedListItem
      number={1}
      title={t(`offerPage.createOffer.title.firstStep.${userRole}`)}
    >
      <Box sx={styles.specialization}>
        <Box>
          <Typography sx={[styles.description, styles.category]}>
            {t(`offerPage.createOffer.description.category.${userRole}`)}
          </Typography>
          <AppAutoComplete
            getOptionLabel={getLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            loading={categoriesLoading}
            onBlur={handleBlur('categoryId')}
            onChange={handleAutocompleteChange('categoryId')}
            options={categoriesItems}
            sx={styles.inputs}
            textFieldProps={{
              label: t('offerPage.createOffer.labels.category'),
              error: Boolean(errors.categoryId),
              helperText: t(errors.categoryId) || ' '
            }}
            value={getValue(categoriesItems, 'categoryId')}
          />
          <AppAutoComplete
            disabled={!data.categoryId}
            getOptionLabel={getLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            loading={subjectsLoading}
            onBlur={handleBlur('subjectId')}
            onChange={handleAutocompleteChange('subjectId')}
            options={subjectsItems}
            textFieldProps={{
              error: Boolean(data.categoryId && errors.subjectId),
              helperText: data.categoryId ? t(errors.subjectId) : ' ',
              label: t('offerPage.createOffer.labels.subject')
            }}
            value={getValue(subjectsItems, 'subjectId')}
          />
        </Box>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.createOffer.description.level.${userRole}`)}
          </Typography>
          <CheckboxList
            error={t(errors.proficiencyLevel)}
            items={levelOptions}
            onChange={(value) =>
              handleNonInputValueChange('proficiencyLevel', value)
            }
            value={data.proficiencyLevel}
          />
        </Box>
      </Box>
    </OrderedListItem>
  )
}

export default SpecializationBlock
