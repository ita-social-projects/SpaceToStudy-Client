import Box from '@mui/material/Box'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

export const switcherOptions = {
  left: {
    text: 'left text',
    tooltip: 'left tooltip'
  },
  right: {
    text: 'right text',
    tooltip: 'right tooltip'
  }
}
  

const FilterBarMenu = () => {
  return (
    <Box>
      <AppContentSwitcher
        active={ false }
        handleChange={ (...changes: {name: string, args: boolean }[]) => console.log(changes) } styles={ {} } switchOptions={ switcherOptions }
        typographyVariant='h6'
      />
    </Box>
  )
}

export default FilterBarMenu
