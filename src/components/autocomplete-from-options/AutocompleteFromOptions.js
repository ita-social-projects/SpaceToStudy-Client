import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
import AddIcon from '@mui/icons-material/Add'
import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/components/autocomplete-from-options/AutocompleteFromOptions.styles'

const AutocompleteFromOptions = ({ options, formState, handleFormChange, btnText }) => {
  const handleChange = (field, idx) => (event, newValue) => {
    const itemsCopy = [...formState]
    itemsCopy[idx][field] = newValue
    handleFormChange(itemsCopy)
  }

  const removeItem = (idx) => () => {
    const itemsCopy = [...formState]
    itemsCopy.splice(idx, 1)
    handleFormChange(itemsCopy)
  }

  const addItem = () => {
    const newItem = {}
    Object.keys(options).forEach((key) => (newItem[key] = null))
    handleFormChange([...formState, newItem])
  }

  const disableOption = (label, currentOption) => (option) =>
    formState.some((elem) => elem[label] === option && option !== currentOption)

  const getInputs = (inputData, idx) =>
    Object.entries(options).map(([key, inputParams]) => {
      return (
        <Autocomplete
          disablePortal
          getOptionDisabled={ inputParams.disableSelected && disableOption(key, inputData[key]) }
          getOptionLabel={ inputParams.getOptionLabel }
          key={ key }
          onChange={ handleChange(key, idx) }
          options={ inputParams.options }
          renderInput={ (params) => <AppTextField { ...params } label={ inputParams.label } /> }
          value={ inputData[key] }
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
      <Button
        onClick={ addItem } size='large' startIcon={ <AddIcon /> }
        sx={ styles.btn }
      >
        { btnText }
      </Button>
    </>
  )
}

export default AutocompleteFromOptions
