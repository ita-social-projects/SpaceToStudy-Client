import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'
import {
  ButtonVariantEnum,
  ComponentEnum,
  PositionEnum,
  UserMainSubject,
  OpenProfessionalCategoryModalHandler
} from '~/types'
import DeleteIcon from '@mui/icons-material/Delete'
import useConfirm from '~/hooks/use-confirm'
import { styles } from '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory.styles'

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
      sendConfirm: () => {
        handleDelete()
      }
    })
  }

  const CardItem = ({
    label,
    children
  }: {
    label: string
    children: string
  }) => {
    return (
      <Box sx={styles.card.item}>
        <Typography component={ComponentEnum.Dt} sx={styles.card.item.label}>
          {label}:
        </Typography>
        <Typography component={ComponentEnum.Dd} sx={styles.card.item.value}>
          {children}
        </Typography>
      </Box>
    )
  }

  const Subjects = item.subjects.map((subject) => (
    <Box key={subject._id} sx={styles.subjects.item}>
      <CardItem label={t('editProfilePage.profile.professionalTab.subject')}>
        {subject.name}
      </CardItem>
    </Box>
  ))

  return (
    <Box sx={styles.root}>
      <Box sx={styles.toolbar.root}>
        <Box sx={styles.toolbar.buttonGroup}>
          <AppButton
            onClick={() => openProfessionalCategoryModal(item)}
            variant={ButtonVariantEnum.ContainedLight}
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
          <span>
            <IconButton
              data-testid='delete-professional-category-button'
              disabled={item.isDeletionBlocked}
              onClick={handleDeleteButtonClick}
              sx={styles.toolbar.deleteButton}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <Box component={ComponentEnum.Dl} sx={styles.card.root}>
        <CardItem
          label={t('editProfilePage.profile.professionalTab.mainStudyCategory')}
        >
          {item.category.name}
        </CardItem>
        <Divider sx={styles.divider} />
        <Box sx={styles.subjects.root}>{Subjects}</Box>
      </Box>
    </Box>
  )
}

export default ProfessionalCategory
