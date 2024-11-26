import { Ref, SyntheticEvent, forwardRef } from 'react'
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

export const AlertTitle = ({ children, ...props }: AlertTitleProps) => {
  return <MuiAlertTitle {...props}>{children}</MuiAlertTitle>
}

AlertTitle.displayName = 'AlertTitle'

interface AlertProps extends MuiAlertProps {
  title?: string
  description?: string
  label?: string
}

type AlertRef = Ref<HTMLDivElement>

const Alert = forwardRef(
  (
    {
      title,
      label,
      description,
      children,
      icon,
      onClose,
      className,
      ...props
    }: AlertProps,
    forwardedRef: AlertRef
  ) => {
    const handleClose = (event: SyntheticEvent) => {
      if (onClose) {
        onClose(event)
      }
    }

    const CloseButton = (
      <button aria-label='Close alert' className='s2s-alert-close-button'>
        {label && <span className='s2s-alert-close-button-label'>{label}</span>}
        <CloseRounded />
      </button>
    )

    return (
      <MuiAlert
        className={cn('s2s-alert', className)}
        icon={icon}
        iconMapping={{
          error: <ErrorOutline fontSize='inherit' />,
          warning: <WarningAmberOutlined fontSize='inherit' />,
          info: <InfoOutlined fontSize='inherit' />,
          success: <CheckCircleOutline fontSize='inherit' />
        }}
        onClose={handleClose}
        ref={forwardedRef}
        slots={{
          closeButton: () => CloseButton
        }}
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <p>{description}</p>}
        {children}
      </MuiAlert>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert
