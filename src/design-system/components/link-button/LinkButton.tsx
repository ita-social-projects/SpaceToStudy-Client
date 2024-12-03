import { FC, ReactNode } from 'react'
import Loader from '~/components/loader/Loader'
import { LinkButtonVariantEnum, SizeEnum } from '~/types'
import { Link } from 'react-router-dom'
import { cn } from '~/utils/cn'
import '~scss-components/link-button/LinkButton.scss'

interface LinkButtonProps {
  children: ReactNode
  to: string
  variant: LinkButtonVariantEnum
  size?: SizeEnum | null
  loading?: boolean
  disabled?: boolean
}

const LinkButton: FC<LinkButtonProps> = ({
  children,
  to,
  variant,
  size = SizeEnum.Medium,
  loading,
  disabled
}) => {
  const loader = <Loader size={20} sx={{ opacity: '0.6' }} />
  return (
    <Link
      className={cn(
        's2s-link-button',
        `s2s-link-button_${variant}`,
        `s2s-link-button_${size}`,
        (disabled || loading) && 's2s-link-button_disabled',
        loading && 's2s-link-button_loading'
      )}
      to={disabled ? '#' : to}
    >
      {loading && <div className='s2s-link-button_loader'>{loader}</div>}
      <div className='s2s-link-button_content'>{children}</div>
    </Link>
  )
}

export default LinkButton
