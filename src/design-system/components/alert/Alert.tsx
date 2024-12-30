import { SyntheticEvent, forwardRef, ButtonHTMLAttributes } from 'react'
import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  AlertTitle as MuiAlertTitle,
  AlertTitleProps
} from '@mui/material'
import {
  ErrorOutline,
  WarningAmberOutlined,
  InfoOutlined,
  CheckCircleOutline,
  CloseRounded
} from '@mui/icons-material'

import { cn } from '~/utils/cn'

import '~scss-components/alert/Alert.scss'

export type AlertColor = 'success' | 'info' | 'warning' | 'error'

export const AlertTitle = ({ children, ...props }: AlertTitleProps) => {
  return <MuiAlertTitle {...props}>{children}</MuiAlertTitle>
}

AlertTitle.displayName = 'AlertTitle'

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

const CloseButton = ({ label }: CloseButtonProps) => {
  return (
    <button aria-label='Close alert' className='s2s-alert-close-button'>
      {label && <span className='s2s-alert-close-button-label'>{label}</span>}
      <CloseRounded />
    </button>
  )
}

CloseButton.displayName = 'CloseButton'

const iconMapping = {
  error: <ErrorOutline fontSize='inherit' />,
  warning: <WarningAmberOutlined fontSize='inherit' />,
  info: <InfoOutlined fontSize='inherit' />,
  success: <CheckCircleOutline fontSize='inherit' />
}

interface AlertProps extends MuiAlertProps {
  title?: string
  description?: string
  label?: string
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ title, label, description, icon, onClose, className, ...props }, ref) => {
    const handleClose = (event: SyntheticEvent) => {
      if (onClose) {
        onClose(event)
      }
    }

    return (
      <MuiAlert
        className={cn('s2s-alert', className)}
        icon={icon}
        iconMapping={iconMapping}
        onClose={handleClose}
        ref={ref}
        slots={{
          closeButton: () => <CloseButton label={label} />
        }}
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <p className='s2s-alert-description'>{description}</p>}
      </MuiAlert>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert
