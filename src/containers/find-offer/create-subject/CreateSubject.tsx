import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'
import Image from '~/assets/img/signup-dialog/student.svg'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Button from '~scss-components/button/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomplete/AsyncAutocomplete'

import {
  ButtonTypeEnum,
  CategoryNameInterface,
  ComponentEnum,
  ErrorResponse
} from '~/types'
import { snackbarVariants } from '~/constants'
import { categoryService } from '~/services/category-service'
import { validations } from '~/containers/find-offer/create-subject/CreateSubject.constants'
import { styles } from '~/containers/find-offer/create-subject/CreateSubject.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { subjectService } from '~/services/subject-service'
import { CreateSubjectParams } from '~/types/subject/interfaces/subject.interface'
import useMutation from '~/hooks/use-mutation'

const CreateSubjectModal = () => {
  const { closeModal } = useModalContext()
  const { setNeedConfirmation } = useConfirm()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'categoriesPage.newSubject.successMessage'
      })
    )
    closeModal()
  }

  const { isPending, mutate: createSubject } = useMutation({
    mutationFn: subjectService.createSubject,
    queryKey: ['createSubject'],
    onError: handleResponseError,
    onSuccess: handleResponse
  })

  const {
    data,
    errors,
    isDirty,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<CreateSubjectParams>({
    initialValues: {
      name: '',
      category: ''
    },
    validations,
    submitWithData: true,
    onSubmit: (data) => {
      if (data) {
        createSubject(data)
      }
    }
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const handleCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null | string
  ) => {
    if (typeof value === 'object') {
      handleNonInputValueChange('category', value?._id ?? '')
    } else {
      handleNonInputValueChange('category', value)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgWrapper}>
        <Box component='img' src={Image} sx={styles.img} />
      </Box>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.formWrapper}
      >
        <TitleWithDescription
          description={t('categoriesPage.newSubject.description')}
          style={styles.titleDescription}
          title={t('categoriesPage.newSubject.title')}
        />
        <Typography sx={styles.inputTitle}>
          {t('categoriesPage.newSubject.subject')}
        </Typography>
        <AppTextField
          errorMsg={t(errors.name)}
          fullWidth
          label={t('categoriesPage.newSubject.labels.subject')}
          onBlur={handleBlur('name')}
          onChange={handleInputChange('name')}
          value={data.name}
        />
        <Typography sx={styles.inputTitle}>
          {t('categoriesPage.newSubject.category')}
        </Typography>
        <AsyncAutocomplete<CategoryNameInterface, CategoryNameInterface, true>
          fetchOnFocus
          freeSolo
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={handleCategoryChange}
          onInputChange={handleCategoryChange}
          queryOptions={{ type: 'categories' }}
          service={categoryService.getCategoriesNames}
          textFieldProps={{
            label: t('offerPage.labels.category'),
            error: Boolean(errors.category),
            helperText: t(errors.category) ?? ' '
          }}
          value={data.category}
          valueField='name'
        />
        <Button
          loading={isPending}
          sx={styles.button}
          type={ButtonTypeEnum.Submit}
        >
          {t('button.sendRequest')}
        </Button>
      </Box>
    </Box>
  )
}

export default CreateSubjectModal
