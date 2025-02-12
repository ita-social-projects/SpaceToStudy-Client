import { useCallback, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import { AxiosResponse } from 'axios'

import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useQuery from '~/hooks/use-query'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import usePagination from '~/hooks/table/use-pagination'
import { authRoutes } from '~/router/constants/authRoutes'
import { useModalContext } from '~/context/modal-context'
import { defaultResponses } from '~/constants'

import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-quizzes/QuizzesContainer.constants'

import { type Quiz, ResourcesTabsEnum } from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { getFullUrl } from '~/utils/get-full-url'
import ChangeResourceConfirmModal from '../change-resource-confirm-modal/ChangeResourceConfirmModal'
import useMutation from '~/hooks/use-mutation'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

const QuizzesContainer = () => {
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const { handleErrorAlert } = useSnackbarAlert()
  const queryClient = useQueryClient()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const { openModal } = useModalContext()
  const { handleSuccessAlert, handleErrorAlert } = useSnackbarAlert()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = adjustColumns<Quiz>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getQuizzes = useCallback(() => {
    return ResourceService.getQuizzesQuery({
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      sort,
      title: searchTitle.current,
      categories: selectedItems
    })
  }, [itemsPerPage, sort, searchTitle, page, selectedItems])

  const { mutate: handleDeleteQuiz } = useMutation({
    mutationFn: ResourceService.deleteQuizQuery,
    onError: handleErrorAlert,
    onSuccess: () => {
      handleSuccessAlert(`myResourcesPage.quizzes.successDeletion`)
      void queryClient.invalidateQueries({ queryKey: ['quizzes'] }) // TODO: remove and replace with queryKey, when <N> issue will be merged
    }
    // queryKey: ['quizzes']
  })

  const {
    data: quizzes,
    isLoading: isQuizzesLoading,
    error: quizzesError,
    refetch: refetchQuiz
  } = useQuery({
    queryKey: ['quizzes', itemsPerPage, sort, page, selectedItems],
    queryFn: getQuizzes,
    options: {
      staleTime: Infinity
    }
  })

  const onEdit = (id: string) => {
    if (!quizzes) {
      return
    }

    const resource = quizzes.items.find((item) => item._id === id)
    openModal({
      component: (
        <ChangeResourceConfirmModal
          onConfirm={() => {
            return navigate(
              getFullUrl({
                pathname: authRoutes.myResources.editQuiz.route,
                parameters: { id }
              })
            )
          }}
          resourceId={id}
          title={resource?.title}
        />
      )
    })
  }

  useEffect(() => {
    if (quizzesError) {
      handleErrorAlert(quizzesError)
    }
  }, [handleErrorAlert, quizzesError])

  const props = {
    columns: columnsToShow,
    resourceItems: quizzes ?? defaultResponses.itemsWithCount,
    itemsPerPage,
    actions: { onEdit, onDelete: handleDeleteQuiz },
    resourceType: ResourcesTabsEnum.Quizzes,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText='myResourcesPage.quizzes.addBtn'
        fetchData={refetchQuiz}
        link={authRoutes.myResources.newQuiz.path}
        placeholder='myResourcesPage.quizzes.searchInput'
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        sortOptions={sortOptions}
      />
      {isQuizzesLoading || !quizzes ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Quiz> {...props} />
      )}
    </Box>
  )
}

export default QuizzesContainer
