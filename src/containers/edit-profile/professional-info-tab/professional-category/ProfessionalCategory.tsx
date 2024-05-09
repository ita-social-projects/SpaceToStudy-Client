import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'
import { ButtonVariantEnum, ComponentEnum, PositionEnum } from '~/types'
import DeleteIcon from '@mui/icons-material/Delete'
import useConfirm from '~/hooks/use-confirm'
import { styles } from '~/containers/edit-profile/professional-info-tab/professional-category/ProfessionalCategory.styles'
import {
  OpenProfessionalCategoryModalHandler,
  ProfessionalCategoryWithActivationControls
} from '~/types'

interface ProfessionalCategoryProps {
  item: ProfessionalCategoryWithActivationControls
  openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler
}

const ProfessionalCategory: FC<ProfessionalCategoryProps> = ({
  item,
  openProfessionalCategoryModal
}) => {
  const { t } = useTranslation()
  const { openDialog } = useConfirm()

  const handleActivateButtonClick = () => {
    // @TODO: handle activation logic
  }

  const handleDeactivateButtonClick = () => {
    // @TODO: handle deactivation logic
  }

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
        // @TODO: handle deleting category
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

  const ToolbarButtons = item.isActivated ? (
    <>
      <AppButton
        onClick={() => openProfessionalCategoryModal(item)}
        variant={ButtonVariantEnum.ContainedLight}
      >
        {t('editProfilePage.profile.professionalTab.editCategoryBtn')}
      </AppButton>
      <Tooltip
        arrow
        placement={PositionEnum.Right}
        title={
          <Typography sx={styles.toolbar.deactivateButtonTooltip}>
            {t(
              `editProfilePage.profile.professionalTab.deactivateCategoryBtn${
                !item.isActivationBlocked ? 'Enabled' : 'Disabled'
              }Tooltip`
            )}
          </Typography>
        }
      >
        <Box>
          <AppButton
            disabled={item.isActivationBlocked}
            onClick={handleDeactivateButtonClick}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('editProfilePage.profile.professionalTab.deactivateCategoryBtn')}
          </AppButton>
        </Box>
      </Tooltip>
    </>
  ) : (
    <AppButton
      onClick={handleActivateButtonClick}
      variant={ButtonVariantEnum.Tonal}
    >
      {t('editProfilePage.profile.professionalTab.activateCategoryBtn')}
    </AppButton>
  )

  const Subjects = item.subjects.map((subject) => (
    <Box key={subject._id} sx={styles.subjects.item}>
      <CardItem label={t('editProfilePage.profile.professionalTab.subject')}>
        {subject.name}
      </CardItem>
      <CardItem
        label={t('editProfilePage.profile.professionalTab.proficiencyLevels')}
      >
        {subject.proficiencyLevels.join(', ')}
      </CardItem>
    </Box>
  ))

  return (
    <Box sx={styles.root(item.isActivated)}>
      <Box sx={styles.toolbar.root}>
        <Box sx={styles.toolbar.buttonGroup}>{ToolbarButtons}</Box>
        <IconButton
          onClick={handleDeleteButtonClick}
          sx={styles.toolbar.deleteButton}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box component={ComponentEnum.Dl} sx={styles.card.root(item.isActivated)}>
        <CardItem
          label={t('editProfilePage.profile.professionalTab.mainStudyCategory')}
        >
          {item.name}
        </CardItem>
        <Divider sx={styles.divider} />
        <Box sx={styles.subjects.root}>{Subjects}</Box>
      </Box>
    </Box>
  )
}

export default ProfessionalCategory
