import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'

import { styles } from '~/components/tab/Tab.styles'
import { FC } from 'react'

interface TabProps {
  activeTab: boolean
  onClick: () => void
  label: string
}

const Tab: FC<TabProps> = ({ activeTab, onClick, label }) => {
  const { t } = useTranslation()

  return (
    <Button
      onClick={onClick}
      sx={[styles.defaultTab, activeTab && styles.activeTab]}
    >
      {t(label)}
    </Button>
  )
}

export default Tab
