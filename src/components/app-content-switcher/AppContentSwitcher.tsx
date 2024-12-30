import { FC } from 'react'
import { TypographyProps } from '@mui/material/Typography'
import { Typography } from '@mui/material'
import { SxProps } from '@mui/system'
import Tooltip from '@mui/material/Tooltip'
import Switch from '~/design-system/components/switch/Switch'
import Stack from '@mui/material/Stack'
import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'
import { SwitchContent, SwitchOptions } from '~/types'

interface SwitcherProps {
  active: boolean
  onChange: () => void
  switchOptions: SwitchOptions
  typographyVariant: TypographyProps['variant']
  styles?: SxProps
}

const AppContentSwitcher: FC<SwitcherProps> = ({
  active,
  onChange,
  switchOptions,
  typographyVariant,
  styles
}) => {
  const renderBlock = (options: SwitchContent | undefined, active: boolean) =>
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
    <Stack sx={{ ...defaultStyles.stack, ...styles } as SxProps}>
      {renderBlock(switchOptions.left, active)}
      <Switch data-testid='switch' onChange={onChange} />
      {renderBlock(switchOptions.right, !active)}
    </Stack>
  )
}

export default AppContentSwitcher
