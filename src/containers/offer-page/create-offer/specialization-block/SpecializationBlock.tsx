import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'

import { levelsTranslationKeys } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { CreateOfferBlockProps } from '~/types'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'

const SpecializationBlock = <T extends CreateOfferData>({
  data,
  errors,
  handleBlur,
  handleNonInputValueChange,
  handleAutocompleteChange
}: CreateOfferBlockProps<T>) => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)

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
            error={Boolean(errors.category)}
            helperText={t(errors.category) || ' '}
            label='Category'
            onBlur={handleBlur('category')}
            onChange={handleAutocompleteChange('category')}
            options={[]}
            sx={styles.inputs}
            value={data.category}
          />
          <AppAutoComplete
            disabled={!data.category}
            error={Boolean(data.category && errors.subject)}
            helperText={data.category ? t(errors.subject) : ' '}
            label='Subject'
            onBlur={handleBlur('subject')}
            onChange={handleAutocompleteChange('subject')}
            value={data.subject}
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
