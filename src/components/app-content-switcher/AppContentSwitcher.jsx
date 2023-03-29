import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'

const AppContentSwitcher = ({ active, handleChange, switchOptions, typographyVariant, styles = {} }) => {

  const renderBlock = (options, active) => (
    options && (<Tooltip arrow title={ options.tooltip }>
      <Typography
        sx={ active ? defaultStyles.colorActive : defaultStyles.colorInActive }
        variant={ typographyVariant }
      >
        { options.text }
      </Typography>
    </Tooltip>)
  )

  return (
    <Stack
      alignItems='center' direction='row'
      sx={ defaultStyles && styles }
    >
      { renderBlock(switchOptions.left, active) }
      <Switch checked={ active } data-testid='switch' onChange={ handleChange } />
      { renderBlock(switchOptions.right, !active) }
    </Stack>
  )
}

export default AppContentSwitcher
