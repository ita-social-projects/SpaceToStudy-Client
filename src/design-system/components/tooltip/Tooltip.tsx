import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DoneIcon from '@mui/icons-material/Done'
import '~scss-components/tooltip/Tooltip.scss'
import { cn } from '~/utils/cn'

type TooltipProps = {
  variant: 'icon' | 'text' | 'icon-text'
  title: string
  description?: string
  position: 'up' | 'down' | 'right' | 'left' | 'none'
  icon?: React.ReactNode
}

const ToolTip: React.FC<TooltipProps> = ({
  variant,
  title,
  description,
  position,
  icon
}) => {
  const textContent = (
    <Box className='s2s-tooltip-text-container'>
      <Typography className='s2s-tooltip-title'>{title}</Typography>
      {description && <Typography>{description}</Typography>}
    </Box>
  )

  const iconContent = (
    <Box className='s2s-tooltip-icon'>{icon || <DoneIcon />}</Box>
  )

  return (
    <Box
      className={cn(
        's2s-tooltip',
        `s2s-tooltip-${variant}`,
        `s2s-tooltip-${position}`
      )}
      data-testid='tooltip-container'
    >
      {variant === 'icon' && iconContent}
      {variant === 'icon-text' && (
        <>
          {iconContent}
          {textContent}
        </>
      )}
      {variant === 'text' && textContent}
    </Box>
  )
}

export default ToolTip
