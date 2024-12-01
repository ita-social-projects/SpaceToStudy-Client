import Box from '@mui/material/Box'
import { FC } from 'react'
import ProfessionalCategory from '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory'
import { styles } from '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList.styles'
import { OpenProfessionalCategoryModalHandler, UserMainSubject } from '~/types'

interface ProfessionalCategoryListProps {
  items: UserMainSubject[]
  openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler
  handleDeleteCategory: (id: string, categoryId: string) => void
}

const ProfessionalCategoryList: FC<ProfessionalCategoryListProps> = ({
  items,
  openProfessionalCategoryModal,
  handleDeleteCategory
}) => {
  const uniqueItems = items.filter(
    (item, index, array) =>
      array.findIndex((i) => i.category._id === item.category._id) === index
  )

  const professionalCategoryItems = uniqueItems.map((item) => {
    const handleDelete = () => handleDeleteCategory(item._id, item.category._id)
    return (
      <ProfessionalCategory
        handleDelete={handleDelete}
        item={item}
        key={item.category._id}
        openProfessionalCategoryModal={openProfessionalCategoryModal}
      />
    )
  })

  return <Box sx={styles.cards}>{professionalCategoryItems}</Box>
}

export default ProfessionalCategoryList
