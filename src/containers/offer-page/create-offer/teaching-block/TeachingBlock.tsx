import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CounterTwo_icon from '~/assets/img/find-offer/counter_two.svg'
import UAH_icon from '~/assets/img/find-offer/currency_uah.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'

import { languagesTranslationKeys } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'


interface TeachingBlockProps{
    data: CreateOfferData,
    errors: {[K in keyof CreateOfferData]: string}
    handleNonInputValueChange: (key: keyof CreateOfferData, value: CreateOfferData[keyof CreateOfferData]) => void
    handleInputChange: (key: keyof CreateOfferData) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (key: keyof CreateOfferData) => (event: React.FocusEvent<HTMLInputElement>) => void;
    handleAutocompleteChange: (key: keyof CreateOfferData ) => (_: React.ChangeEvent<HTMLInputElement>, value: string | null) => void
}

const TeachingBlock:FC<TeachingBlockProps> = ({ data, errors, handleBlur, handleInputChange, handleNonInputValueChange, handleAutocompleteChange }) => {
  const { userRole } = useSelector((state) => state.appMain)

  const { t } = useTranslation()

  const languages = languagesTranslationKeys.map(lang => t(lang))

  const handleLanguageDelete = (value: string) => {
    handleNonInputValueChange('languages', data.languages.filter((lang: string) => lang !== value))
  }
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    (Number(e.target.value) || e.target.value ==='') && handleInputChange('price')(e)
  }

  return (
    <Box>
      <Typography sx={ styles.title }> 
        <Box
          component="img"
          src={ CounterTwo_icon }
          sx={ styles.icon }
        />
        { t(`offerPage.createOffer.title.secondStep.${userRole}`) }
      </Typography>
      <Box sx={ styles.specialization }>
        <Box sx={ styles.inputBlock }>
          <Typography sx={ styles.description }>
            { t(`offerPage.createOffer.description.describe.${userRole}`) }
          </Typography>
          <AppTextArea
            errorMsg={ t(errors.description) }
            fullWidth
            label={ 'Describe your offer' } 
            maxLength={ 1000 }
            onBlur={ handleBlur('description') }
            onChange={ handleInputChange('description') }
            value={ data.description } 
          />
        </Box>
        <Box>
          <Typography sx={ [styles.description, styles.category] }>
            { t(`offerPage.createOffer.description.languages.${userRole}`) }
          </Typography>
          <AppAutoComplete
            error={ Boolean(errors.languages) }
            helperText={ t(errors.languages) || ' ' }
            label={ 'Language' }
            onChange={ handleAutocompleteChange('languages') }
            options={ languages }
          />
          <AppChipList
            defaultQuantity={ 3 } 
            handleChipDelete={ handleLanguageDelete }
            items={ data.languages }
          />
        </Box>
        <Box sx={ styles.inputBlock }>
          <Typography sx={ styles.description }>
            { t(`offerPage.createOffer.description.price.${userRole}`) }
          </Typography>
          <AppTextField 
            InputProps={ { 
              startAdornment:( 
                <Box
                  component="img"
                  src={ UAH_icon }
                  sx={ styles.currencyIcon }
                /> )
            } }
            errorMsg={ t(errors.price) }
            fullWidth={ false }
            inputProps={ {
              inputMode: 'numeric'
            } }  
            onBlur={ handleBlur('price') } 
            onChange={ handlePriceChange }
            value={ data.price }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default TeachingBlock
