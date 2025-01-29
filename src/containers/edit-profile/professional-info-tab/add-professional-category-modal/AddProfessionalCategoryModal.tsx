import { FC, SyntheticEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  ButtonTypeEnum,
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

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import Button from '~scss-components/button/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'
import {
  professionalSubjectTemplate,
  userMainSubjectTemplate
} from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.constants'

import { styles } from '~/containers/edit-profile/professional-info-tab/add-professional-category-modal/AddProfessionalCategoryModal.styles'
import { fetchAndTranslateData } from '~/utils/fetch-and-translate-category'
import { titleToCamel } from '~/utils/title-to-camel-case'

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

  const getSubjectsNames = useCallback(() => {
    return fetchAndTranslateData(
      () => subjectService.getSubjectsNames(selectedCategory),
      'subjects',
      t
    )
  }, [selectedCategory, t])

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
          labelField='displayName'
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
    const { category, subjects } = data
    if (category.appearance === undefined) {
      category.appearance = { color: '#E3B21C', icon: 'ScienceRoundedIcon' }
    }
    const sanitizedCategory = {
      ...category,
      name: t(`categories.${titleToCamel(category.name)}`, {
        lng: 'en',
        defaultValue: category.name
      })
    }
    const sanitizedSubjects = subjects.map((subject) => ({
      ...subject,
      name: t(`subjects.${titleToCamel(subject.name)}`, {
        lng: 'en',
        defaultValue: subject.name
      })
    }))
    const categoryData: UserMainSubject = {
      ...data,
      category: sanitizedCategory,
      subjects: sanitizedSubjects,
      _id: isEdit ? (initialValuesFromProps?._id ?? '') : crypto.randomUUID(),
      isDeletionBlocked
    }
    if (isEdit) {
      dispatch(
        updateCategory({ category: categoryData, userRole: userRoleCategory })
      )
    } else {
      dispatch(
        addCategory({ category: categoryData, userRole: userRoleCategory })
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
      { ...professionalSubjectTemplate, _id: crypto.randomUUID() }
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
  const fetchTranslatedCategories = useCallback(() => {
    return fetchAndTranslateData(
      () => categoryService.getCategoriesNames(),
      'categories',
      t
    )
  }, [t])
  const SubjectsGroup = data.subjects.map((subject, index) => (
    <SubjectGroup
      disableOptions={data.subjects as Array<Partial<SubjectInterface>>}
      handleChange={handleProfessionalSubjectChange(index)}
      handleSubjectDelete={() => handleSubjectDelete(subject._id || '')}
      key={subject._id}
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
          labelField='displayName'
          onChange={handleMainStudyCategoryChange}
          service={fetchTranslatedCategories}
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
          <Button onClick={handleSubjectAdd} startIcon={<AddIcon />}>
            {t(
              'editProfilePage.profile.professionalTab.addCategoryModal.addSubjectBtn'
            )}
          </Button>
        </Box>
      </Box>
      <Box sx={styles.buttonGroup}>
        <Button
          disabled={!isSubmitDisabled(data.subjects)}
          type={ButtonTypeEnum.Submit}
        >
          {t(
            'editProfilePage.profile.professionalTab.addCategoryModal.submitBtn'
          )}
        </Button>
        <Button onClick={closeModal} variant='tonal'>
          {t(
            'editProfilePage.profile.professionalTab.addCategoryModal.discardBtn'
          )}
        </Button>
      </Box>
    </Box>
  )
}

export default AddProfessionalCategoryModal
