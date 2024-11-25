import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'

import {
  AboutStudentData,
  ComponentEnum,
  MainUserRole,
  OpenProfessionalCategoryModalHandler,
  ProfessionalBlock,
  UserRoleEnum
} from '~/types'

import {
  deleteCategory,
  setField,
  updateValidityStatus
} from '~/redux/features/editProfileSlice'

import { useDebounce } from '~/hooks/use-debounce'
import useForm from '~/hooks/use-form'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import ProfessionalCategoryList from '~/containers/edit-profile/professional-info-tab/professional-category-list/ProfessionalCategoryList'
import AddProfessionalCategoryModal from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal'
import AboutTutorAccordion from '~/containers/edit-profile/professional-info-tab/about-tutor-accordion/AboutTutorAccordion'
import AboutStudentAccordion from '~/containers/edit-profile/professional-info-tab/about-student-accordion/AboutStudentAccordion'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Button from '~scss-components/button/Button'
import { scrollToAndHighlight } from '~/utils/scroll-and-highlight'

import { styles } from '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab.styles'
import { highlightElem } from '~/containers/edit-profile/common.styles'

const ProfessionalInfoTab: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.appMain)
  const { categories, professionalBlock, aboutStudent } = useAppSelector(
    (state) => state.editProfile
  )

  const { openModal, closeModal } = useModalContext()

  const isTutor = userRole === UserRoleEnum.Tutor

  const { isValid, data, handleInputChange } = useForm<ProfessionalBlock>({
    initialValues: professionalBlock
  })

  const {
    isValid: isValidStudent,
    data: dataStudent,
    handleInputChange: handleInputChangeStudent
  } = useForm<AboutStudentData>({
    initialValues: aboutStudent
  })

  const debouncedAboutUserData = useDebounce(() => {
    dispatch(
      setField({
        field: isTutor ? 'professionalBlock' : 'aboutStudent',
        value: isTutor ? data : dataStudent
      })
    )
  }, 300)

  useEffect(() => {
    debouncedAboutUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataStudent])

  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      scrollToAndHighlight(`${pathname}${hash}`)
    }
  }, [pathname, hash])

  const handleDeleteCategory = (categoryId: string) => {
    const userRoleToDeleteCategory = userRole as MainUserRole
    dispatch(
      deleteCategory({ id: categoryId, userRole: userRoleToDeleteCategory })
    )
  }

  useEffect(() => {
    dispatch(
      updateValidityStatus({
        tab: 'professionalInfoTab',
        value: isValid && isValidStudent
      })
    )
  }, [isValid, isValidStudent, dispatch])

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

  const AboutUserInfo = (
    <Box component='section' id='education'>
      <Box sx={highlightElem}></Box>
      <TitleWithDescription
        description={t(
          `editProfilePage.profile.professionalTab.${userRole}AboutDescription`
        )}
        isHighlighted
        style={styles.titleWithDescription}
        title={t(
          `editProfilePage.profile.professionalTab.${userRole}AboutTitle`
        )}
      />
      <Box sx={styles.accordionContainer}>
        {isTutor ? (
          <AboutTutorAccordion
            data={data}
            handleInputChange={handleInputChange}
          />
        ) : (
          <AboutStudentAccordion
            data={dataStudent}
            handleInputChange={handleInputChangeStudent}
          />
        )}
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
      <Box component={ComponentEnum.Section} id='category'>
        <Box sx={highlightElem}></Box>
        <TitleWithDescription
          description={t(
            `editProfilePage.profile.professionalTab.categoriesDescription.${userRole}`
          )}
          isHighlighted
          style={styles.titleWithDescription}
          title={t('editProfilePage.profile.professionalTab.categoriesTitle')}
        />
        <Box sx={styles.createBtnContainer}>
          <Button
            onClick={() => openProfessionalCategoryModal()}
            startIcon={<AddIcon />}
          >
            {t('editProfilePage.profile.professionalTab.addCategoryBtn')}
          </Button>
        </Box>
        <ProfessionalCategoryList
          handleDeleteCategory={handleDeleteCategory}
          items={categories[userRole as MainUserRole]}
          openProfessionalCategoryModal={openProfessionalCategoryModal}
        />
      </Box>
      {AboutUserInfo}
    </Box>
  )
}

export default ProfessionalInfoTab
