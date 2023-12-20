import { FC, ReactNode } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/tab/Tab.styles'

interface TabProps extends ButtonProps {
  activeTab: boolean
  onClick: () => void
  children: ReactNode
}

const Tab: FC<TabProps> = ({ activeTab, onClick, children, sx, ...props }) => {
  return (
    <Button
      onClick={onClick}
      sx={spliceSx(styles.tab(activeTab), sx)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Tab
