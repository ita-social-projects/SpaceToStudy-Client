import { useCallback } from 'react'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'

import { questionService } from '~/services/question-service'
import { defaultResponses, snackbarVariants } from '~/constants'
import { ErrorResponse, QuestionForm } from '~/types'

const CreateOrEditQuestion = () => {
  const { setAlert } = useSnackBarContext()

  const createQuestion = useCallback(
    (data?: QuestionForm) => questionService.createQuestion(data),
    []
  )

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'categoriesPage.newSubject.successMessage'
    })
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
