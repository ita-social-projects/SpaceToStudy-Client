import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.styles'
import {
  ButtonVariantEnum,
  ComponentEnum,
  ProfessionalCategory,
  ProfessionalSubject,
  ProficiencyLevelEnum
} from '~/types'
import useForm from '~/hooks/use-form'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AddIcon from '@mui/icons-material/Add'
import { professionalSubjectTemplate } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'
import ProficiencyLevelSelect from '~/containers/proficiency-level-select/ProficiencyLevelSelect'

interface ValueWithHandler<T> {
  value: T
  handleChange: (value: T) => void
}

interface SubjectGroupProps {
  isCategoryDisabled: boolean
  subjectName: ValueWithHandler<string | null>
  proficiencyLevels: ValueWithHandler<ProficiencyLevelEnum[]>
}

function SubjectGroup({
  isCategoryDisabled,
  subjectName,
  proficiencyLevels
}: SubjectGroupProps) {
  const { t } = useTranslation()

  return (
    <Box sx={styles.item}>
      <Box sx={styles.checkboxGroup}>
        <Checkbox checked disabled={isCategoryDisabled} sx={styles.checkbox} />
        <AppAutoComplete
          fullWidth
          onChange={(_, value) => subjectName.handleChange(value)}
          options={['Subject1', 'Subject2', 'Subject3']} // @TODO: replace with actual subjects from backend
          textFieldProps={{
            label: `${t('editProfilePage.profile.professionalTab.subject')}*`
          }}
          value={subjectName.value}
        />
      </Box>
      <ProficiencyLevelSelect
        fullWidth
        label={t('editProfilePage.profile.professionalTab.proficiencyLevels')}
        onChange={(event) =>
          proficiencyLevels.handleChange(
            event.target.value as ProficiencyLevelEnum[]
          )
        }
        value={proficiencyLevels.value}
      />
    </Box>
  )
}

interface AddProfessionalCategoryModalProps {
  closeModal: () => void
  initialValues?: ProfessionalCategory
}

const AddProfessionalCategoryModal: FC<AddProfessionalCategoryModalProps> = ({
  closeModal,
  initialValues: initialValuesFromProps
}) => {
  const { t } = useTranslation()

  const initialFormValues = {
    mainStudyCategory: initialValuesFromProps?.name ?? '',
    subjects: initialValuesFromProps?.subjects ?? [professionalSubjectTemplate]
  }

  // @TODO: add more validations if needed
  const { data, errors, handleDataChange, handleSubmit } = useForm({
    initialValues: initialFormValues,
    // eslint-disable-next-line
    onSubmit: async () => {
      // @TODO: handle data save
      void closeModal()
    }
  })

  const handleMainStudyCategoryChange = (
    _: SyntheticEvent,
    value: string | null
  ) => {
    handleDataChange({ mainStudyCategory: value })
  }

  const handleProfessionalSubjectChange =
    (index: number, key: keyof ProfessionalSubject) =>
    <Value,>(value: Value) => {
      const transformedSubjects = data.subjects.map((subject, i) => {
        if (index === i) {
          return { ...subject, [key]: value }
        }

        return subject
      })

      handleDataChange({ subjects: transformedSubjects })
    }

  const handleSubjectAdd = () => {
    handleDataChange({
      subjects: [...data.subjects, professionalSubjectTemplate]
    })
  }

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <TitleWithDescription
        description={t(
          'editProfilePage.profile.professionalTab.addCategoryModal.description'
        )}
        style={styles.titleWithDescription}
        title={t(
          'editProfilePage.profile.professionalTab.addCategoryModal.title'
        )}
      />
      <Box sx={styles.formWrapper}>
        <AppAutoComplete
          fullWidth
          onChange={handleMainStudyCategoryChange}
          options={['Language1', 'Language2', 'Language3']} // @TODO: replace with actual languages from backend
          textFieldProps={{
            label: `${t(
              'editProfilePage.profile.professionalTab.mainStudyCategory'
            )}*`,
            error: Boolean(errors.mainStudyCategory),
            helperText: errors.mainStudyCategory
          }}
          value={data.mainStudyCategory}
        />
        {data.subjects.map((subject, index) => (
          <SubjectGroup
            isCategoryDisabled // @TODO: handle checkbox
            key={index}
            proficiencyLevels={{
              value: subject.proficiencyLevels,
              handleChange: handleProfessionalSubjectChange(
                index,
                'proficiencyLevels'
              )
            }}
            subjectName={{
              value: subject.name,
              handleChange: handleProfessionalSubjectChange(index, 'name')
            }}
          />
        ))}
        <Box sx={styles.addOneMoreSubjectButton}>
          <AppButton
            onClick={handleSubjectAdd}
            startIcon={<AddIcon />}
            variant={ButtonVariantEnum.ContainedLight}
          >
            {t(
              'editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn'
            )}
          </AppButton>
        </Box>
      </Box>
      <Box sx={styles.buttonGroup}>
        <AppButton type='submit' variant={ButtonVariantEnum.Contained}>
          {t(
            'editProfilePage.profile.professionalTab.addCategoryModal.submitBtn'
          )}
        </AppButton>
        <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
          {t(
            'editProfilePage.profile.professionalTab.addCategoryModal.discardBtn'
          )}
        </AppButton>
      </Box>
    </Box>
  )
}

export default AddProfessionalCategoryModal
