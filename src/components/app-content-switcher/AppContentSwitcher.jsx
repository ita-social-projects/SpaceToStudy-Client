import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'

const AppContentSwitcher = ({
  active,
  onChange,
  switchOptions,
  typographyVariant,
  styles
}) => {
  const renderBlock = (options, active) =>
    options && (
      <Tooltip arrow title={options.tooltip}>
        <Typography
          sx={active ? defaultStyles.colorActive : {}}
          variant={typographyVariant}
        >
          {options.text}
        </Typography>
      </Tooltip>
    )

  return (
    <Stack sx={{ ...defaultStyles.stack, ...styles }}>
      {renderBlock(switchOptions.left, active)}
      <Switch
        checked={active}
        data-testid='switch'
        onChange={onChange}
        sx={defaultStyles.switch}
      />
      {renderBlock(switchOptions.right, !active)}
    </Stack>
  )
}

export default AppContentSwitcher
