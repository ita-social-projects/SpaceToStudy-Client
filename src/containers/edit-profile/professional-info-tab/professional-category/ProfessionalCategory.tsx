import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'
import AppChip from '~/components/app-chip/AppChip'
import { getCategoryIcon } from '~/services/category-icon-service'
import {
  ButtonVariantEnum,
  ComponentEnum,
  PositionEnum,
  UserMainSubject,
  OpenProfessionalCategoryModalHandler,
  SizeEnum
} from '~/types'
import useConfirm from '~/hooks/use-confirm'
import { styles } from '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory.styles'
import { getValidatedHexColor } from '~/utils/get-validated-hex-color'

interface ProfessionalCategoryProps {
  item: UserMainSubject
  openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler
  handleDelete: () => void
}

const ProfessionalCategory: FC<ProfessionalCategoryProps> = ({
  item,
  openProfessionalCategoryModal,
  handleDelete
}) => {
  const { t } = useTranslation()
  const { openDialog } = useConfirm()

  const handleDeleteButtonClick = () => {
    openDialog({
      title: t(
        'editProfilePage.profile.professionalTab.deleteCategoryModal.title'
      ),
      message: t(
        'editProfilePage.profile.professionalTab.deleteCategoryModal.description'
      ),
      cancelButton: t(
        'editProfilePage.profile.professionalTab.deleteCategoryModal.cancelBtn'
      ),
      confirmButton: t(
        'editProfilePage.profile.professionalTab.deleteCategoryModal.submitBtn'
      ),
      sendConfirm: (isConfirmed) => {
        isConfirmed && handleDelete()
      }
    })
  }

  const handleEditButtonClick = () => {
    openProfessionalCategoryModal(item, true)
  }

  const DescriptionItem = ({
    label,
    children
  }: {
    label: string
    children: ReactNode
  }) => {
    return (
      <>
        <Typography component={ComponentEnum.Dt} sx={styles.description.label}>
          {label}:
        </Typography>
        <Typography component={ComponentEnum.Dd} sx={styles.description.value}>
          {children}
        </Typography>
      </>
    )
  }

  const categoryColor = getValidatedHexColor(item.category.appearance.color)
  const CategoryIcon = getCategoryIcon(item.category.appearance.icon)

  const Subjects = item.subjects.map((subject) => (
    <AppChip
      key={subject._id}
      labelSx={styles.subjectChipLabel(categoryColor)}
      sx={styles.subjectChip(categoryColor)}
    >
      {subject.name}
    </AppChip>
  ))

  return (
    <Box sx={styles.root}>
      <Box sx={styles.toolbar.root}>
        <Box sx={styles.toolbar.buttonGroup}>
          <AppButton
            onClick={handleEditButtonClick}
            size={SizeEnum.Medium}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('editProfilePage.profile.professionalTab.editCategoryBtn')}
          </AppButton>
        </Box>
        <Tooltip
          arrow
          placement={PositionEnum.Right}
          sx={styles.toolbar.deactivateButtonTooltip}
          title={
            item.isDeletionBlocked &&
            t(
              'editProfilePage.profile.professionalTab.deleteCategoryBtnDisabledTooltip'
            )
          }
        >
          <IconButton
            data-testid='delete-professional-category-button'
            disabled={item.isDeletionBlocked}
            onClick={handleDeleteButtonClick}
            sx={styles.toolbar.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box component={ComponentEnum.Dl} sx={styles.description.grid}>
        <DescriptionItem
          label={t('editProfilePage.profile.professionalTab.mainStudyCategory')}
        >
          <CategoryIcon sx={styles.categoryIcon(categoryColor)} />
          {item.category.name}
        </DescriptionItem>
        <DescriptionItem
          label={t('editProfilePage.profile.professionalTab.subject')}
        >
          {Subjects}
        </DescriptionItem>
      </Box>
    </Box>
  )
}

export default ProfessionalCategory
