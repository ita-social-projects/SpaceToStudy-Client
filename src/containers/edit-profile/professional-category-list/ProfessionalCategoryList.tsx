import Box from '@mui/material/Box'
import { FC } from 'react'
import ProfessionalCategory from '~/containers/edit-profile/professional-category/ProfessionalCategory'
import { styles } from '~/containers/edit-profile/professional-category-list/ProfessionalCategoryList.styles'
import {
  OpenProfessionalCategoryModalHandler,
  ProfessionalCategoryWithActivationControls
} from '~/types'

interface ProfessionalCategoryListProps {
  items: ProfessionalCategoryWithActivationControls[]
  openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler
}

const ProfessionalCategoryList: FC<ProfessionalCategoryListProps> = ({
  items,
  openProfessionalCategoryModal
}) => {
  const professionalCategoryItems = items.map((item) => (
    <ProfessionalCategory
      item={item}
      key={item._id}
      openProfessionalCategoryModal={openProfessionalCategoryModal}
    />
  ))

  return <Box sx={styles.cards}>{professionalCategoryItems}</Box>
}

export default ProfessionalCategoryList
