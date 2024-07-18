import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import { useModalContext } from '~/context/modal-context'

import {
  ButtonVariantEnum,
  ComponentEnum,
  MainUserRole,
  OpenProfessionalCategoryModalHandler,
  ProfessionalBlock,
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
import { useDebounce } from '~/hooks/use-debounce'
import {
  deleteCategory,
  updateProfessionalBlock
} from '~/redux/features/editProfileSlice'

const ProfessionalInfoTab: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.appMain)
  const {
    categories,
    education,
    workExperience,
    scientificActivities,
    awards
  } = useAppSelector((state) => state.editProfile)

  const { openModal, closeModal } = useModalContext()

  const { data, handleInputChange } = useForm<ProfessionalBlock>({
    initialValues:
      { education, workExperience, scientificActivities, awards } ||
      initialFormValues
  })

  const debouncedProfessionalBlockData = useDebounce(() => {
    void dispatch(updateProfessionalBlock(data))
  }, 300)

  useEffect(() => {
    debouncedProfessionalBlockData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleDeleteCategory = (categoryId: string) => {
    const userRoleToDeleteCategory = userRole as MainUserRole
    void dispatch(
      deleteCategory({ id: categoryId, userRole: userRoleToDeleteCategory })
    )
  }

  const openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler = (
    initialValues,
    isEdit
  ) => {
    openModal({
      component: (
        <AddProfessionalCategoryModal
          {...{ initialValues, closeModal, isEdit }}
          blockedCategoriesOptions={categories[userRole as MainUserRole]}
          isDeletionBlocked={initialValues?.isDeletionBlocked}
        />
      ),
      paperProps: {
        sx: styles.createCategoryButton
      }
    })
  }

  const TutorInfo = userRole === UserRoleEnum.Tutor && (
    <Box component='section'>
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.professionalTab.aboutTheTutorDescription'
        )}
        style={styles.titleWithDescription}
        title={t('editProfilePage.profile.professionalTab.aboutTheTutorTitle')}
      />
      <Box sx={styles.accordionContainer}>
        <AboutTutorAccordion
          data={data}
          handleInputChange={handleInputChange}
        />
      </Box>
    </Box>
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
          items={categories[userRole as MainUserRole]}
          openProfessionalCategoryModal={openProfessionalCategoryModal}
        />
      </Box>
      {TutorInfo}
    </Box>
  )
}

export default ProfessionalInfoTab
