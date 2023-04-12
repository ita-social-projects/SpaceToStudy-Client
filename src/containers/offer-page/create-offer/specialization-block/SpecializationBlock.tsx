import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CounterOne_icon from '~/assets/img/find-offer/conuter_one.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import { CreateOfferData } from '~/containers/offer-page/create-offer/CreateOffer'

import { levelsTranslationKeys } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { styles } from '~/containers/offer-page/create-offer/CreateOffer.styles'

interface SpecializationBlockProps{
    data: CreateOfferData,
    errors: {[K in keyof CreateOfferData]: string},
    handleNonInputValueChange: (key: keyof CreateOfferData, value: CreateOfferData[keyof CreateOfferData]) => void
    handleAutocompleteChange: (key: keyof CreateOfferData ) => (_: React.ChangeEvent<HTMLInputElement>, value: string | null) => void
    handleBlur: (key: keyof CreateOfferData) => (event: React.FocusEvent<HTMLInputElement>) => void;
}

const SpecializationBlock:FC<SpecializationBlockProps> = ({ data, errors, handleBlur, handleNonInputValueChange, handleAutocompleteChange }) => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)

  const levelOptions = levelsTranslationKeys.map(level => t(level))

  return (
    <Box sx={ styles.specializationWrap }>
      <Typography sx={ styles.title }> 
        <Box
          component="img"
          src={ CounterOne_icon }
          sx={ styles.icon }
        />
        { t(`offerPage.createOffer.title.firstStep.${userRole}`) }
      </Typography>
      <Box sx={ styles.specialization }>
        <Box>
          <Typography sx={ [styles.description, styles.category ] }>
            { t(`offerPage.createOffer.description.category.${userRole}`) }
          </Typography>
          <AppAutoComplete
            error={ Boolean(errors.category) } 
            helperText={ t(errors.category) || ' ' } 
            label='Category' 
            onBlur={ handleBlur('category') }
            onChange={ handleAutocompleteChange('category') }
            options={ [] }
            sx={ styles.inputs }
            value={ data.category }
          />
          <AppAutoComplete
            disabled={ !data.category } 
            error={ Boolean(data.category && errors.subject) }
            helperText={ data.category ? t(errors.subject) : ' ' } 
            label='Subject' 
            onBlur={ handleBlur('subject') }
            onChange={ handleAutocompleteChange('subject') }
            value={ data.subject }
          />
        </Box>
        <Box sx={ styles.inputBlock }>
          <Typography sx={ styles.description }>
            { t(`offerPage.createOffer.description.level.${userRole}`) }
          </Typography>
          <CheckboxList
            error={ t(errors.proficiencyLevel) }
            items={ levelOptions } 
            onChange={ (value) => handleNonInputValueChange('proficiencyLevel', value) }
            value={ data.proficiencyLevel }
          />
        </Box>
      </Box>
    </Box >
  )
}

export default SpecializationBlock
