import { useTranslation } from 'react-i18next'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from './ProfileProfessionalTab.styles'
import AppButton from '~/components/app-button/AppButton'
import {
  ButtonVariantEnum,
  ComponentEnum,
  OpenProfessionalCategoryModalHandler,
  ProfessionalCategoryWithActivationControls,
  ProficiencyLevelEnum
} from '~/types'
import Box from '@mui/material/Box'
import ProfessionalCategoryList from '~/containers/edit-profile/professional-category-list/ProfessionalCategoryList'
import { useModalContext } from '~/context/modal-context'
import AddProfessionalCategoryModal from '~/containers/edit-profile/add-professional-category-modal/AddProfessionalCategoryModal'
import AddIcon from '@mui/icons-material/Add'
import AboutTutorAccordion from '~/containers/edit-profile/about-tutor-accordion/AboutTutorAccordion'

// TODO: replace mock data to real data
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

const ProfileProfessionalTab = () => {
  const { t } = useTranslation()

  const { openModal, closeModal } = useModalContext()

  const openProfessionalCategoryModal: OpenProfessionalCategoryModalHandler = (
    initialValues
  ) => {
    openModal({
      component: (
        <AddProfessionalCategoryModal
          closeModal={closeModal}
          initialValues={initialValues}
        />
      ),
      paperProps: {
        sx: styles.createCategoryButton
      }
    })
  }

  return (
    <Box sx={styles.root}>
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
          items={mockCategoriesData}
          openProfessionalCategoryModal={openProfessionalCategoryModal}
        />
      </Box>
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
          <AboutTutorAccordion />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileProfessionalTab
