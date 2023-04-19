import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import UAH_icon from '~/assets/img/find-offer/currency_uah.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'

import { languagesTranslationKeys } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { CreateOfferBlockProps } from '~/types'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'

interface TeachingBlockProps<T> extends CreateOfferBlockProps<T> {
  handleAutocompleteChange: (
    key: keyof T
  ) => (_: React.ChangeEvent<HTMLInputElement>, value: string | null) => void
  handleInputChange: (
    key: keyof T
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TeachingBlock = <T extends CreateOfferData>({
  data,
  errors,
  handleBlur,
  handleInputChange,
  handleNonInputValueChange,
  handleAutocompleteChange
}: TeachingBlockProps<T>) => {
  const { userRole } = useSelector((state) => state.appMain)

  const { t } = useTranslation()

  const languages = languagesTranslationKeys.map((lang) => t(lang))

  const handleLanguageDelete = (value: string) => {
    handleNonInputValueChange(
      'languages',
      data.languages.filter((lang: string) => lang !== value)
    )
  }
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) || e.target.value === '') {
      handleInputChange('price')(e)
    }
  }

  return (
    <OrderedListItem
      number={2}
      title={t(`offerPage.createOffer.title.secondStep.${userRole}`)}
    >
      <Box sx={styles.specialization}>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.createOffer.description.describe.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={t(errors.description)}
            fullWidth
            label={'Describe your offer'}
            maxLength={1000}
            onBlur={handleBlur('description')}
            onChange={handleInputChange('description')}
            value={data.description}
          />
        </Box>
        <Box>
          <Typography sx={[styles.description, styles.category]}>
            {t(`offerPage.createOffer.description.languages.${userRole}`)}
          </Typography>
          <AppAutoComplete
            error={Boolean(errors.languages)}
            helperText={t(errors.languages) || ' '}
            label={'Language'}
            onChange={handleAutocompleteChange('languages')}
            options={languages}
          />
          <AppChipList
            defaultQuantity={3}
            handleChipDelete={handleLanguageDelete}
            items={data.languages}
          />
        </Box>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.createOffer.description.price.${userRole}`)}
          </Typography>
          <AppTextField
            InputProps={{
              startAdornment: (
                <Box component='img' src={UAH_icon} sx={styles.currencyIcon} />
              )
            }}
            errorMsg={t(errors.price)}
            fullWidth={false}
            inputProps={{
              inputMode: 'numeric'
            }}
            onBlur={handleBlur('price')}
            onChange={handlePriceChange}
            value={data.price}
          />
        </Box>
      </Box>
    </OrderedListItem>
  )
}

export default TeachingBlock
