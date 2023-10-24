import { FC } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

import { styles } from '~/components/tab/Tab.styles'

interface TabProps extends ButtonProps {
  activeTab: boolean
  onClick: () => void
  children: React.ReactNode
}

const Tab: FC<TabProps> = ({ activeTab, onClick, children, ...props }) => {
  return (
    <Button
      onClick={onClick}
      sx={[styles.defaultTab, activeTab && styles.activeTab]}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Tab
