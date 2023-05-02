import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'

import { useAppSelector } from '~/hooks/use-redux'
import {
  CategoryNameInterface,
  CreateOfferBlockProps,
  ProficiencyLevelEnum
} from '~/types'
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
  const { userRole } = useAppSelector((state) => state.appMain)
  const { response: categoriesItems, loading: categoriesLoading } =
    useCategoriesNames()

  const { response: subjectsItems, loading: subjectsLoading } =
    useSubjectsNames({
      category: data.category
    })

  const getValue = useCallback(
    (array: CategoryNameInterface[], key: keyof T) =>
      array.find((option) => option._id === data[key]) || null,
    [data]
  )

  const handleAutocompleteChange =
    (key: keyof Pick<T, 'category' | 'subject'>) =>
    (_: React.ChangeEvent, value: CategoryNameInterface | null) => {
      handleNonInputValueChange(key, value?._id || '')
      if (!value) {
        handleNonInputValueChange('subject', '')
      }
    }

  const handleCheckboxesChange = (value: string[]) =>
    handleNonInputValueChange('proficiencyLevel', value)

  const getLabel = (option: CategoryNameInterface) => option.name || ''

  const isOptionEqualToValue = (
    option: CategoryNameInterface,
    value: CategoryNameInterface
  ) => option?._id === value?._id

  const levelOptions = Object.values(ProficiencyLevelEnum)
  const subjectError = data.category && errors.subject

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
            onBlur={handleBlur('category')}
            onChange={handleAutocompleteChange('category')}
            options={categoriesItems}
            sx={styles.inputs}
            textFieldProps={{
              label: t('offerPage.createOffer.labels.category'),
              error: Boolean(errors.category),
              helperText: t(errors.category) || ' '
            }}
            value={getValue(categoriesItems, 'category')}
          />
          <AppAutoComplete
            disabled={!data.category}
            getOptionLabel={getLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            loading={subjectsLoading}
            onBlur={handleBlur('subject')}
            onChange={handleAutocompleteChange('subject')}
            options={subjectsItems}
            textFieldProps={{
              error: Boolean(subjectError),
              helperText: subjectError ? t(errors.subject) : ' ',
              label: t('offerPage.createOffer.labels.subject')
            }}
            value={getValue(subjectsItems, 'subject')}
          />
        </Box>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.createOffer.description.level.${userRole}`)}
          </Typography>
          <CheckboxList
            error={t(errors.proficiencyLevel)}
            items={levelOptions}
            onChange={handleCheckboxesChange}
            value={data.proficiencyLevel}
          />
        </Box>
      </Box>
    </OrderedListItem>
  )
}

export default SpecializationBlock
