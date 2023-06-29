import React, { FC } from 'react'
import Button from '@mui/material/Button'

import { styles } from '~/components/tab/Tab.styles'

interface TabProps {
  activeTab: boolean
  onClick?: (event: React.SyntheticEvent) => void
  children: React.ReactNode
}

const Tab: FC<TabProps> = ({ activeTab, onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      sx={[styles.defaultTab, activeTab && styles.activeTab]}
    >
      {children}
    </Button>
  )
}

export default Tab
