import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
import AddIcon from '@mui/icons-material/Add'
import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/components/autocomplete-from-options/AutocompleteFromOptions.styles'

const AutocompleteFromOptions = ({ options, formState, handleFormChange, btnText }) => {
  const { t } = useTranslation()

  const handleChange = (field, idx) => (event, newValue) => {
    const newItems = [...formState]
    newItems[idx][field] = newValue
    handleFormChange(newItems)
  }

  const removeItem = (idx) => () => {
    const newItems = [...formState]
    newItems.splice(idx, 1)
    handleFormChange(newItems)
  }

  const addItem = () => handleFormChange((prevState) => [...prevState, {}])

  const disableOption = (label, currentOption) => (option) =>
    formState.some((elem) => elem[label] === option && option !== currentOption)

  const getInputs = (inputData, idx) =>
    Object.entries(options).map(([key, inputParams]) => {
      return (
        <Autocomplete
          disablePortal
          getOptionDisabled={ inputParams.disableSelected && disableOption(key, inputData[key]) }
          key={ key }
          onChange={ handleChange(key, idx) }
          options={ inputParams.options }
          renderInput={ (params) => <AppTextField { ...params } label={ inputParams.label } /> }
          value={ inputData[key] || null }
        />
      )
    })

  return (
    <>
      <Box sx={ styles.form }>
        { formState.map((item, idx) => {
          return (
            <Box key={ idx } sx={ styles.container }>
              <Box sx={ styles.inputGroup }>
                { getInputs(item, idx) }
              </Box>
              { formState.length > 1 && (
                <IconButton data-testid='deleteBtn' onClick={ removeItem(idx) }>
                  <CloseIcon color='primary' />
                </IconButton>
              ) }
            </Box>
          )
        }) }
      </Box>
      <Button onClick={ addItem } sx={ styles.btn }>
        <AddIcon />
        { btnText }
      </Button>
    </>
  )
}

export default AutocompleteFromOptions
