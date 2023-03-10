import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'

const AppContentSwitcher = (props) => {
  const { active, handleChange, tooltipRight, tooltipLeft, spacing, leftText, rightText, colorActive, colorInActive, typographyVariant, styles } = props

  const blocks = [
    { text: leftText, tooltip: tooltipLeft },
    { text: rightText, tooltip: tooltipRight },
  ]

  const renderBlock = ({ text, tooltip }, index) => (
    <Tooltip arrow key={ index } title={ tooltip }>
      <Typography color={ index === 0 ? colorActive : colorInActive } data-testid='text' variant={ typographyVariant }>
        { text }
      </Typography>
    </Tooltip>
  )

  return (
    <Stack
      alignItems='center' direction='row' spacing={ spacing }
      sx={ defaultStyles && styles }
    >
      { blocks.map((block, index) => (
        <>
          { index !== 0 && <Switch checked={ active } data-testid='switch' onChange={ handleChange } /> }
          { renderBlock(block, index) }
        </>
      )) }
    </Stack>
  )
}

export default AppContentSwitcher
