import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import useUpdateUser from '~/hooks/use-update-user'
import { useAppSelector } from '~/hooks/use-redux'

import { useModalContext } from '~/context/modal-context'

import {
  ButtonVariantEnum,
  ComponentEnum,
  OpenProfessionalCategoryModalHandler,
  ProfessionalBlock,
  SizeEnum,
  UserMainSubject,
  UserRoleEnum
} from '~/types'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import ProfessionalCategoryList from '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList'
import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import AboutTutorAccordion from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion'
import { initialFormValues } from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion.constants'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab.styles'

interface ProfessionalInfoTabProps {
  professionalBlock?: ProfessionalBlock
  categories: UserMainSubject[]
}

const ProfessionalInfoTab: FC<ProfessionalInfoTabProps> = ({
  professionalBlock,
  categories = []
}) => {
  const { t } = useTranslation()

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const { openModal, closeModal } = useModalContext()

  const { handleSubmit, loading } = useUpdateUser(userId, true)

  const { data, handleInputChange } = useForm<ProfessionalBlock>({
    initialValues: professionalBlock || initialFormValues
  })

  const handleDeleteCategory = (mainSubjectId: string, categoryId: string) => {
    const deletedMainSubject = {
      _id: mainSubjectId,
      category: { _id: categoryId, name: '' }
    }

    handleSubmit({
      mainSubjects: deletedMainSubject
    })
  }

  const handleUpdateInfo = () => {
    handleSubmit({ professionalBlock: data })
  }

  const openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler = (
    initialValues
  ) => {
    openModal({
      component: (
        <AddProfessionalCategoryModal
          {...{ handleSubmit, loading, initialValues, closeModal }}
          blockedCategoriesOptions={categories}
          isDeletionBlocked={initialValues?.isDeletionBlocked}
        />
      ),
      paperProps: {
        sx: styles.createCategoryButton
      }
    })
  }

  const TutorInfo = userRole === UserRoleEnum.Tutor && (
    <>
      <Box component='section'>
        <TitleWithDescription
          description={t(
            'editProfilePage.profile.professionalTab.aboutTheTutorDescription'
          )}
          style={styles.titleWithDescription}
          title={t(
            'editProfilePage.profile.professionalTab.aboutTheTutorTitle'
          )}
        />
        <Box sx={styles.accordionContainer}>
          <AboutTutorAccordion
            data={data}
            handleInputChange={handleInputChange}
          />
        </Box>
      </Box>
      <AppButton
        disabled={false}
        loading={loading}
        onClick={handleUpdateInfo}
        size={SizeEnum.ExtraLarge}
        sx={styles.updateProfileBtn}
        variant={ButtonVariantEnum.Contained}
      >
        {t('editProfilePage.profile.updateProfileBtn')}
      </AppButton>
    </>
  )

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.professionalTab.mainDescription'
        )}
        style={styles.mainTitleWithDescription}
        title={t('editProfilePage.profile.professionalTab.mainTitle')}
      />
      <Box component={ComponentEnum.Section}>
        <TitleWithDescription
          description={t(
            'editProfilePage.profile.professionalTab.categoriesDescription'
          )}
          style={styles.titleWithDescription}
          title={t('editProfilePage.profile.professionalTab.categoriesTitle')}
        />
        <Box sx={styles.createBtnContainer}>
          <AppButton
            onClick={() => openProfessionalCategoryModal()}
            startIcon={<AddIcon />}
            variant={ButtonVariantEnum.Contained}
          >
            {t('editProfilePage.profile.professionalTab.addCategoryBtn')}
          </AppButton>
        </Box>
        <ProfessionalCategoryList
          handleDeleteCategory={handleDeleteCategory}
          items={categories}
          openProfessionalCategoryModal={openProfessionalCategoryModal}
        />
      </Box>
      {TutorInfo}
    </Box>
  )
}

export default ProfessionalInfoTab
