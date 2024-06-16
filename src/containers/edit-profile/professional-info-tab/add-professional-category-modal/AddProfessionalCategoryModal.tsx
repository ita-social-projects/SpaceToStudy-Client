import { FC, SyntheticEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  CategoryNameInterface,
  ComponentEnum,
  ProfessionalCategory,
  SubjectInterface,
  SubjectNameInterface,
  UpdateUserParams,
  UserMainSubject
} from '~/types'

import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import useForm from '~/hooks/use-form'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import AppButton from '~/components/app-button/AppButton'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import {
  professionalSubjectTemplate,
  userMainSubjectTemplate
} from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'
import { styles } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.styles'

interface SubjectGroupProps {
  subject: SubjectNameInterface
  selectedCategory: string
  handleChange: (value: Partial<SubjectNameInterface>) => void
  disableOptions: Array<SubjectNameInterface>
  handleSubjectDelete: () => void
}

function SubjectGroup({
  handleChange,
  subject,
  selectedCategory,
  disableOptions,
  handleSubjectDelete
}: SubjectGroupProps) {
  const { t } = useTranslation()

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(selectedCategory),
    [selectedCategory]
  )

  const handleDisableOptions = (option: SubjectInterface) => {
    return disableOptions.some((subject) => subject._id === option._id)
  }

  return (
    <Box sx={styles.item}>
      <Box sx={styles.checkboxGroup}>
        <IconButton
          data-testid='deleteBtn'
          onClick={handleSubjectDelete}
          sx={styles.deleteBtn}
        >
          <DeleteIcon />
        </IconButton>
        <AsyncAutocomplete
          data-testid='subjectField'
          disabled={!selectedCategory}
          fullWidth
          getOptionDisabled={handleDisableOptions}
          labelField='name'
          onChange={(_, value) => handleChange(value!)}
          service={getSubjectsNames}
          textFieldProps={{
            label: `${t('editProfilePage.profile.professionalTab.subject')}*`
          }}
          value={subject._id}
          valueField='_id'
        />
      </Box>
    </Box>
  )
}

interface AddProfessionalCategoryModalProps {
  blockedCategoriesOptions?: UserMainSubject[]
  closeModal: () => void
  initialValues?: ProfessionalCategory
  handleSubmit: (data: UpdateUserParams) => void
  loading: boolean
  isDeletionBlocked?: boolean
}

const AddProfessionalCategoryModal: FC<AddProfessionalCategoryModalProps> = ({
  blockedCategoriesOptions = [],
  closeModal,
  initialValues: initialValuesFromProps,
  handleSubmit,
  loading,
  isDeletionBlocked = false
}) => {
  const { t } = useTranslation()

  const initialFormValues = initialValuesFromProps || userMainSubjectTemplate

  const formSubmission = () => {
    handleSubmit({
      mainSubjects: data
    })

    closeModal()
  }

  const {
    data,
    errors,
    handleDataChange,
    handleSubmit: submitForm
  } = useForm({
    initialValues: initialFormValues,
    onSubmit: formSubmission
  })

  const isSubmitDisabled = (subjects: SubjectNameInterface[]) => {
    const areSubjectsPresent = subjects.length > 0
    const areAllSubjectsValid = subjects.every((subject) => subject._id)
    return areAllSubjectsValid && areSubjectsPresent
  }

  const handleMainStudyCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleDataChange({ category: value, professionalSubjectTemplate })
  }

  const handleProfessionalSubjectChange =
    (index: number) =>
    <Value,>(value: Value) => {
      const transformedSubjects = data.subjects.map((subject, i) => {
        if (index === i) {
          return { ...subject, ...value }
        }

        return subject
      })

      handleDataChange({ subjects: transformedSubjects })
    }

  const handleSubjectAdd = () => {
    const newSubjects = [...data.subjects, professionalSubjectTemplate]
    handleDataChange({
      subjects: newSubjects
    })
  }

  const handleSubjectDelete = (id: string) => {
    const updatedSubjects = data.subjects.filter((el) => el._id !== id)
    handleDataChange({
      subjects: updatedSubjects
    })
  }

  const handleBlockOption = (option: CategoryNameInterface) => {
    const isCurrent = option._id !== data.category._id
    const isBlocked = blockedCategoriesOptions.some(
      (mainSubject) => mainSubject.category?._id === option._id
    )
    return isBlocked && isCurrent
  }

  const SubjectsGroup = data.subjects.map((subject, index) => (
    <SubjectGroup
      disableOptions={data.subjects}
      handleChange={handleProfessionalSubjectChange(index)}
      handleSubjectDelete={() => handleSubjectDelete(subject._id)}
      key={index}
      selectedCategory={data.category._id}
      subject={{ name: subject.name, _id: subject._id }}
    />
  ))

  return (
    <Box component={ComponentEnum.Form} onSubmit={submitForm} sx={styles.root}>
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
        <AsyncAutocomplete
          disabled={isDeletionBlocked}
          fullWidth
          getOptionDisabled={handleBlockOption}
          labelField='name'
          onChange={handleMainStudyCategoryChange}
          service={categoryService.getCategoriesNames}
          textFieldProps={{
            label: `${t(
              'editProfilePage.profile.professionalTab.mainStudyCategory'
            )}*`,
            error: Boolean(errors.category),
            helperText: errors.category
          }}
          value={data.category._id}
          valueField='_id'
        />
        {SubjectsGroup}
        <Box sx={styles.addOneMoreSubjectButton}>
          <AppButton
            loading={loading}
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
        <AppButton
          disabled={!isSubmitDisabled(data.subjects)}
          type={ButtonTypeEnum.Submit}
          variant={ButtonVariantEnum.Contained}
        >
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
