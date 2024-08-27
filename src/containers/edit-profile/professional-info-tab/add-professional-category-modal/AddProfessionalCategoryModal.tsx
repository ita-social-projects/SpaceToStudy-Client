import { FC, SyntheticEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  CategoryNameInterface,
  ComponentEnum,
  MainUserRole,
  SubjectInterface,
  UserMainSubject
} from '~/types'

import { addCategory, updateCategory } from '~/redux/features/editProfileSlice'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { isSubmitDisabled } from '~/utils/is-submit-disabled'
import useForm from '~/hooks/use-form'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import {
  professionalSubjectTemplate,
  userMainSubjectTemplate
} from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'

import { styles } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.styles'

interface SubjectGroupProps {
  subject: Partial<SubjectInterface>
  selectedCategory: string
  handleChange: (value: Partial<SubjectInterface>) => void
  disableOptions: Array<Partial<SubjectInterface>>
  handleSubjectDelete: () => void
}

function SubjectGroup({
  handleChange,
  subject,
  selectedCategory,
  disableOptions,
  handleSubjectDelete
}: Readonly<SubjectGroupProps>) {
  const { t } = useTranslation()

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(selectedCategory),
    [selectedCategory]
  )

  const handleDisableOptions = (option: Partial<SubjectInterface>) => {
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
  initialValues?: UserMainSubject
  isDeletionBlocked?: boolean
  isEdit?: boolean
}

const AddProfessionalCategoryModal: FC<AddProfessionalCategoryModalProps> = ({
  blockedCategoriesOptions = [],
  closeModal,
  initialValues: initialValuesFromProps,
  isDeletionBlocked = false,
  isEdit = false
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.appMain)

  const initialFormValues = initialValuesFromProps || userMainSubjectTemplate

  const formSubmission = () => {
    const userRoleCategory = userRole as MainUserRole
    const { category } = data

    // TODO: icon should be displayed accordingly to category
    if (category.appearance === undefined) {
      category.appearance = { color: '#E3B21C', icon: 'ScienceRoundedIcon' }
    }

    if (isEdit) {
      const categoryToUpdate: UserMainSubject = {
        _id: initialValuesFromProps?._id ?? '',
        isDeletionBlocked,
        ...data
      }
      dispatch(
        updateCategory({
          category: categoryToUpdate,
          userRole: userRoleCategory
        })
      )
    } else {
      const categoryToAdd: UserMainSubject = {
        _id: uuidv4(),
        isDeletionBlocked,
        ...data
      }
      dispatch(
        addCategory({
          category: categoryToAdd,
          userRole: userRoleCategory
        })
      )
    }
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

  const handleMainStudyCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleDataChange({
      category: value ? { ...value, _id: value._id || '' } : null,
      subjects: []
    })
  }

  const handleProfessionalSubjectChange =
    (index: number) =>
    <Value,>(value: Value) => {
      const transformedSubjects = data.subjects.map((subject, i) => {
        if (index === i) {
          return {
            ...subject,
            ...value
          }
        }

        return subject
      })

      handleDataChange({ subjects: transformedSubjects })
    }

  const handleSubjectAdd = () => {
    const newSubjects = [
      ...data.subjects,
      { ...professionalSubjectTemplate, _id: uuidv4() }
    ]
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
    const isCurrent = option._id !== data.category?._id
    const isBlocked = blockedCategoriesOptions.some(
      (mainSubject) => mainSubject.category?._id === option._id
    )
    return isBlocked && isCurrent
  }

  const SubjectsGroup = data.subjects.map((subject, index) => (
    <SubjectGroup
      disableOptions={data.subjects as Array<Partial<SubjectInterface>>}
      handleChange={handleProfessionalSubjectChange(index)}
      handleSubjectDelete={() => handleSubjectDelete(subject._id || '')}
      key={index}
      selectedCategory={data.category?._id || ''}
      subject={{
        ...subject
      }}
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
          data-testid='mainStudyCategory'
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
          value={data.category?._id || ''}
          valueField='_id'
        />
        {SubjectsGroup}
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
