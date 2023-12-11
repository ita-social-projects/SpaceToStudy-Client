import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import UAH_icon from '~/assets/img/find-offer/currency_uah.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'

import {
  CreateOfferBlockProps,
  LanguagesEnum,
  CreateOrUpdateOfferData
} from '~/types'
import { styles } from '~/containers/offer-page/OfferPage.styles'

const TeachingBlock = <T extends CreateOrUpdateOfferData>({
  data,
  errors,
  handleBlur,
  handleInputChange,
  handleNonInputValueChange
}: CreateOfferBlockProps<T>) => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const { t } = useTranslation()

  const handleLanguageChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    value: LanguagesEnum | null
  ) => {
    if (value) {
      !data.languages.includes(value) &&
        handleNonInputValueChange('languages', [...data.languages, value])
    }
  }

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
      title={t(`offerPage.title.secondStep.${userRole}`)}
    >
      <Box sx={styles.specialization}>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.description.title.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={t(errors.title)}
            fullWidth
            label={t(`offerPage.labels.title`)}
            maxLength={100}
            maxRows={1}
            onBlur={handleBlur('title')}
            onChange={handleInputChange('title')}
            required
            value={data.title}
          />
        </Box>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.description.describe.${userRole}`)}
          </Typography>
          <AppTextArea
            errorMsg={t(errors.description)}
            fullWidth
            label={t(`offerPage.labels.describe.${userRole}`)}
            maxLength={1000}
            onBlur={handleBlur('description')}
            onChange={handleInputChange('description')}
            required
            value={data.description}
          />
        </Box>
        <Box>
          <Typography sx={[styles.description, styles.category]}>
            {t(`offerPage.description.languages.${userRole}`)}
          </Typography>
          <AppAutoComplete
            blurOnSelect
            onChange={handleLanguageChange}
            options={Object.values(LanguagesEnum)}
            textFieldProps={{
              error: Boolean(errors.languages),
              helperText: t(errors.languages) || ' ',
              label: t('offerPage.labels.language')
            }}
            value={null}
          />
          <AppChipList
            defaultQuantity={3}
            handleChipDelete={handleLanguageDelete}
            items={data.languages}
            wrapperStyle={styles.inputs}
          />
        </Box>
        <Box sx={styles.inputBlock}>
          <Typography sx={styles.description}>
            {t(`offerPage.description.price.${userRole}`)}
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
              'data-testid': 'price-input',
              inputMode: 'numeric'
            }}
            onBlur={handleBlur('price')}
            onChange={handlePriceChange}
            required
            value={data.price}
          />
        </Box>
      </Box>
    </OrderedListItem>
  )
}

export default TeachingBlock
