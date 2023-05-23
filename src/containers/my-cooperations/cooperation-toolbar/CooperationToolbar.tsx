import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import useBreakpoints from '~/hooks/use-breakpoints'
import { CardsViewEnum } from '~/types'
import { styles } from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar.styles'

const CooperationToolbar = () => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <InputWithIcon
        placeholder={t('common.search')}
        startIcon={<SearchIcon sx={styles.searchIcon} />}
        sx={styles.input}
      />
      <Box sx={styles.actionBlock}>
        <AppSelect fields={[]} sx={styles.select} />
        {!isMobile && <ViewSwitcher value={CardsViewEnum.Grid} />}
      </Box>
    </Box>
  )
}

export default CooperationToolbar
