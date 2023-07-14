import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const NavigationIcon = ({ tooltip, icon, buttonProps, badgeContent = 0 }) => {
  return (
    <Tooltip arrow title={tooltip}>
      <IconButton {...buttonProps}>
        <Badge badgeContent={badgeContent} color={'error'}>
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default NavigationIcon
