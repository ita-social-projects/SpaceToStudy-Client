import { useTranslation } from 'react-i18next'

import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import HashLink from '~/components/hash-link/HashLink'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/layout/sidebar/Sidebar.styles'

const Sidebar = ({ onClose, navigationItems, accountItems }) => {
  const { isLaptopAndAbove } = useBreakpoints()
  const { t } = useTranslation()

  const renderListItems = (items) => (
    <List sx={styles.list}>
      {items.map(({ route, path }) => (
        <ListItem key={route} sx={styles.listItem}>
          <Typography
            component={HashLink}
            onClick={onClose}
            sx={styles.listTitle}
            to={path}
          >
            {t(`header.${route}`)}
          </Typography>
        </ListItem>
      ))}
    </List>
  )

  const accountItemsSection = !isLaptopAndAbove && accountItems.length > 0 && (
    <>
      <Divider />
      {renderListItems(accountItems)}
    </>
  )

  return (
    <>
      {renderListItems(navigationItems)}
      {accountItemsSection}
    </>
  )
}

export default Sidebar
