import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'
import { authRoutes } from '~/router/constants/authRoutes'

import { ResourceService } from '~/services/resource-service'
import { defaultResponses, snackbarVariants } from '~/constants'
import { ErrorResponse, QuestionForm } from '~/types'

const CreateOrEditQuestion = () => {
  const navigate = useNavigate()
  const { setAlert } = useSnackBarContext()

  const createQuestion = useCallback(
    (data?: QuestionForm) => ResourceService.createQuestion(data),
    []
  )

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'categoriesPage.newSubject.successMessage'
    })
    navigate(authRoutes.myResources.root.path)
  }

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.message}` : ''
    })
  }

  const { loading, fetchData } = useAxios({
    service: createQuestion,
    defaultResponse: defaultResponses.object,
    fetchOnMount: false,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  return (
    <PageWrapper>
      <QuestionEditor fetchData={fetchData} loading={loading} />
    </PageWrapper>
  )
}

export default CreateOrEditQuestion
