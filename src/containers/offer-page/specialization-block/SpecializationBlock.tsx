import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CheckboxList from '~/components/checkbox-list/CheckboxList'
import { useAppSelector } from '~/hooks/use-redux'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import {
  CategoryNameInterface,
  CreateOfferBlockProps,
  CreateOrUpdateOfferData,
  ProficiencyLevelEnum,
  UserRoleEnum
} from '~/types'
import { proficiencyLevelLabels } from '~/constants/labels'
import { styles } from '~/containers/offer-page/OfferPage.styles'

const levelOptions = Object.values(ProficiencyLevelEnum)

const SpecializationBlock = <T extends CreateOrUpdateOfferData>({
  data,
  errors,
  handleBlur,
  handleNonInputValueChange
}: Omit<CreateOfferBlockProps<T>, 'handleInputChange'>) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(data.category),
    [data.category]
  )

  const handleAutocompleteChange =
    (key: keyof Pick<T, 'category' | 'subject'>) =>
    (_: React.SyntheticEvent, value: CategoryNameInterface | null) => {
      handleNonInputValueChange(key, value?._id ?? '')
      if (key === 'category') {
        handleNonInputValueChange('subject', '')
      }
    }

  const handleCheckboxesChange = (value: ProficiencyLevelEnum[]) => {
    handleNonInputValueChange('proficiencyLevel', value)
  }

  const subjectError = data.category && errors.subject

  const checkboxListProps =
    userRole === UserRoleEnum.Tutor
      ? { fillRange: true }
      : { singleSelect: true }

  return (
    <OrderedListItem
      number={1}
      title={t(`offerPage.title.firstStep.${userRole}`)}
    >
      <Box sx={styles.specialization}>
        <Box>
          <Typography sx={[styles.description, styles.category]}>
            {t(`offerPage.description.category.${userRole}`)}
          </Typography>
          <AsyncAutocomplete
            labelField='name'
            onBlur={handleBlur('category')}
            onChange={handleAutocompleteChange('category')}
            service={categoryService.getCategoriesNames}
            sx={styles.inputs}
            textFieldProps={{
              label: t('offerPage.labels.category'),
              error: Boolean(errors.category),
              helperText: errors.category ? t(errors.category) : ' ',
              required: true
            }}
            value={data.category}
            valueField='_id'
          />
          <AsyncAutocomplete
            disabled={!data.category}
            fetchCondition={Boolean(data.category)}
            labelField='name'
            onBlur={handleBlur('subject')}
            onChange={handleAutocompleteChange('subject')}
            service={getSubjectsNames}
            sx={styles.inputs}
            textFieldProps={{
              error: Boolean(subjectError),
              helperText: subjectError ? t(errors.subject) : ' ',
              label: t('offerPage.labels.subject'),
              required: true
            }}
            value={data.subject}
            valueField='_id'
          />
        </Box>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.description.level.${userRole}`)}
          </Typography>
          <CheckboxList
            error={t(errors.proficiencyLevel)}
            {...checkboxListProps}
            items={levelOptions}
            labels={proficiencyLevelLabels}
            onChange={handleCheckboxesChange}
            value={data.proficiencyLevel}
          />
        </Box>
      </Box>
    </OrderedListItem>
  )
}

export default SpecializationBlock
