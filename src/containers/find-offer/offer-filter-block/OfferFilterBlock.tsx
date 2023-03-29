import { Stack, Typography, Checkbox, FormControlLabel, Box } from '@mui/material'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

import AppRange from '~/components/app-range/AppRange'
import AppSelect from '~/components/app-select/AppSelect'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import FilterInput from '~/components/filter-input/FilterInput'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import useBreakpoints from '~/hooks/use-breakpoints'

const sorts = [{ title:'Newest',value:'createdAt' },{ title:'Rating',value:'rating' },{ title:'Price low-high',value:'priceAsc' },{ title:'Price high-low',value:'priceDesc' }]
const levels = ['Beginner','Intermediate','Advanced', 'Test Preparation','Professional', 'Specialized']

const OfferFilterBlock = ({ filters, setFilters, resetFilters, setFiltersToQuery }) => {
  const { isMobile } = useBreakpoints()
  
  const checked = Boolean(filters.native && JSON.parse(filters.native))
  const active =  filters.orderBy === 'student'
  const switchOptions = { left:{ text: active ? 'Tutors’ offers' : 'Students’ requests' } }

  const setFilterByKey = (key) => (value) => setFilters(value, key)
  
  const handleLanguagesChange = (e,value) => value && setFilters(value, 'language')
  const handleChecked = (e,value) => setFilters(value, 'native')
  const handleChangeSwitcher = (e, value) => setFilters(value ? 'student' : 'tutor', 'orderBy')
    
  const languagesFilter = (
    <Box>
      <AppAutoComplete
        fieldValue={ filters.language } 
        onChange={ handleLanguagesChange } 
        options={ ['All languages', ...languages] }
        size='small'
      />
      <FormControlLabel
        checked={ checked }
        control={ <Checkbox /> }
        label={ <Typography variant='body2'>Native speaker</Typography> } 
        onChange={ handleChecked }
        sx={ { mt: 1 } }
      />
    </Box>
  )

  const mobileFields = !isMobile && (
    <>
      <AppContentSwitcher
        active={ active } 
        handleChange={ handleChangeSwitcher } 
        styles={ { display: 'flex', justifyContent:'space-between' } }
        switchOptions={ switchOptions }
        typographyVariant={ 'subtitle2' }
      />
      <AppSelect
        fields={ sorts } 
        fullWidth 
        selectTitle='Sort by'
        setValue={ setFilterByKey('sort') }
        size='small'
        sx={ { display:'flex', flexDirection:'column', alignItems:'start' } }
        value={ filters.sort }
      />
    </>
  )
  
  return (
    <Stack spacing={ 2 } sx={ { maxWidth: '240px',color: 'primary.700' } }>
      { mobileFields }
      <Typography sx={ { typography: 'midTitle' } }>Level</Typography>
      <CheckboxList
        checked={ filters.level && (Array.isArray(filters.level) ? filters.level : filters.level?.split(',')) }
        items={ levels } 
        onChange={ setFilterByKey('level') }
        variant={ 'body2' }
      />
      <Typography sx={ { typography: 'midTitle' } }>Language</Typography>
      { languagesFilter }
      <Typography sx={ { typography: 'midTitle' } }>Price</Typography>
      <AppRange
        max={ 550 } 
        min={ 150 }
        onChange={ setFilterByKey('price') }
        value={ filters.price && (Array.isArray(filters.price) ? filters.price : filters.price?.split(',')) } 
      />
      <FilterInput onChange={ setFilterByKey('name') } value={ filters.name } />
      <AppButton onClick={ setFiltersToQuery } sx={ { backgroundColor:'primary.500',boxShadow: 'none', '&:hover': { boxShadow: 'none' } } }>Apply Filters</AppButton>
      <AppButton onClick={ resetFilters } variant='tonal' >Clear filters</AppButton>
    </Stack>
  )
}

export default OfferFilterBlock
