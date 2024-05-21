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

// @TODO: replace mock data to real data
const mockCategoriesData: ProfessionalCategoryWithActivationControls[] = [
  {
    _id: crypto.randomUUID(),
    name: 'Languages',
    isActivated: true,
    isActivationBlocked: true,
    subjects: [
      {
        _id: crypto.randomUUID(),
        name: 'English',
        proficiencyLevels: [
          ProficiencyLevelEnum.Beginner,
          ProficiencyLevelEnum.Intermediate,
          ProficiencyLevelEnum.Advanced,
          ProficiencyLevelEnum.Professional,
          ProficiencyLevelEnum.TestPreparation
        ]
      },
      {
        _id: crypto.randomUUID(),
        name: 'English',
        proficiencyLevels: [
          ProficiencyLevelEnum.Beginner,
          ProficiencyLevelEnum.Intermediate,
          ProficiencyLevelEnum.Advanced
        ]
      }
    ]
  },
  {
    _id: crypto.randomUUID(),
    name: 'Languages',
    isActivated: true,
    isActivationBlocked: false,
    subjects: [
      {
        _id: crypto.randomUUID(),
        name: 'English',
        proficiencyLevels: [
          ProficiencyLevelEnum.Beginner,
          ProficiencyLevelEnum.Intermediate,
          ProficiencyLevelEnum.Advanced,
          ProficiencyLevelEnum.Professional,
          ProficiencyLevelEnum.TestPreparation
        ]
      },
      {
        _id: crypto.randomUUID(),
        name: 'English',
        proficiencyLevels: [
          ProficiencyLevelEnum.Beginner,
          ProficiencyLevelEnum.Intermediate,
          ProficiencyLevelEnum.Advanced
        ]
      }
    ]
  },
  {
    _id: crypto.randomUUID(),
    name: 'Computer science',
    isActivated: false,
    isActivationBlocked: false,
    subjects: [
      {
        _id: crypto.randomUUID(),
        name: 'PHP',
        proficiencyLevels: [
          ProficiencyLevelEnum.Beginner,
          ProficiencyLevelEnum.Intermediate,
          ProficiencyLevelEnum.Advanced
        ]
      },
      {
        _id: crypto.randomUUID(),
        name: 'Java',
        proficiencyLevels: [ProficiencyLevelEnum.Beginner]
      }
    ]
  }
]

interface ProfessionalInfoTabProps {
  professionalBlock?: ProfessionalBlock
  categories: UserMainSubject[]
  userId: string
}

const ProfessionalInfoTab: FC<ProfessionalInfoTabProps> = ({
  professionalBlock,
  userId,
  categories
}) => {
  const { t } = useTranslation()

  const { userRole } = useAppSelector((state) => state.appMain)

  const { openModal, closeModal } = useModalContext()

  const { handleSubmit, loading } = useUpdateUser(userId)

  const { data, handleInputChange } = useForm<ProfessionalBlock>({
    initialValues: professionalBlock || initialFormValues
  })

  const handleDeleteCategory = (mainSubjectId: string) => {
    handleSubmit({
      mainSubjects: {
        _id: mainSubjectId,
        category: { _id: '', name: '' },
        subjects: []
      }
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
