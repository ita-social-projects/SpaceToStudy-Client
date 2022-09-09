import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
import AddIcon from '@mui/icons-material/Add'
import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/components/category-with-value/CategoryWithValue.styles'

const CategoryWithValue = ({
  stateItems,
  categoryLabel,
  categoryOptions,
  setStateItems,
  valueLabel,
  valueOptions,
  btnText
}) => {
  const { t } = useTranslation()

  const handleChange = (idx, newValue) => {
    const newItems = [...stateItems]
    newItems[idx] = newValue
    setStateItems(newItems)
  }

  const removeItem = (idx) => {
    const newItems = [...stateItems]
    newItems.splice(idx, 1)
    setStateItems(newItems)
  }

  const addItem = () => setStateItems((prevState) => [...prevState, {}])

  return (
    <Box>
      <Box sx={ styles.form }>
        { stateItems.map((item, idx) => (
          <Box key={ idx } sx={ styles.formItem }>
            <Box sx={ styles.inputGroup }>
              <Autocomplete
                disablePortal
                getOptionDisabled={ (opt) => stateItems.some((elem) => elem.category === opt && opt !== item.category) }
                onChange={ (event, newValue) => {
                  const newItem = { ...item, category: newValue }
                  handleChange(idx, newItem)
                } }
                options={ categoryOptions }
                renderInput={ (params) => {
                  return (
                    <AppTextField
                      { ...params }
                      errorMsg={ item.value && !item.category && t('common.errorMessages.emptyField') }
                      label={ categoryLabel }
                    />
                  )
                } }
                value={ item.category || null }
              />
              <Autocomplete
                disablePortal
                onChange={ (event, newValue) => {
                  handleChange(idx, { ...item, value: newValue })
                } }
                options={ valueOptions }
                renderInput={ (params) => {
                  return (
                    <AppTextField
                      { ...params }
                      errorMsg={ !item.value && item.category && t('common.errorMessages.emptyField') }
                      label={ valueLabel }
                    />
                  )
                } }
                value={ item.value || null }
              />
            </Box>
            { stateItems.length > 1 && (
              <IconButton data-testid='deleteBtn' onClick={ () => removeItem(idx) }>
                <CloseIcon color='primary' />
              </IconButton>
            ) }
          </Box>
        )) }
      </Box>
      <Button onClick={ addItem } sx={ styles.btn }>
        <AddIcon />
        { btnText }
      </Button>
    </Box>
  )
}

export default CategoryWithValue
