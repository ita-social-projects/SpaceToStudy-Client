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

import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-quizzes/QuizzesContainer.constants'

import { type Quiz, ResourcesTabsEnum } from '~/types'
import {
  adjustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'
import ChangeResourceConfirmModal from '../change-resource-confirm-modal/ChangeResourceConfirmModal'

const QuizzesContainer = () => {
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const { handleErrorAlert } = useSnackbarAlert()
  const queryClient = useQueryClient()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const { openModal } = useModalContext()

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = adjustColumns<Quiz>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getQuizzes = useCallback(
    () =>
      ResourceService.getQuizzesQuery({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current,
        categories: selectedItems
      }),
    [itemsPerPage, sort, searchTitle, page, selectedItems]
  )

  const deleteQuiz = useCallback(
    async (id?: string): Promise<AxiosResponse<unknown>> => {
      const response = await ResourceService.deleteQuiz(id ?? '')
      await queryClient.invalidateQueries({ queryKey: ['quizzes'] })
      return response
    },
    [queryClient]
  )

  const {
    data: quizzes,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['quizzes', itemsPerPage, sort, searchTitle, page, selectedItems],
    queryFn: getQuizzes,
    options: {
      staleTime: Infinity
    }
  })

  const onEdit = (id: string) => {
    const resource = quizzes?.items.find((item) => item._id === id)
    openModal({
      component: (
        <ChangeResourceConfirmModal
          onConfirm={() =>
            navigate(createUrlPath(authRoutes.myResources.editQuiz.path, id))
          }
          resourceId={id}
          title={resource?.title}
        />
      )
    })
  }

  useEffect(() => {
    if (error) {
      handleErrorAlert(error)
    }
  }, [handleErrorAlert, error])

  const props = {
    columns: columnsToShow,
    data: { response: quizzes ?? { items: [], count: 0 }, getData: getQuizzes },
    services: { deleteService: deleteQuiz },
    itemsPerPage,
    actions: { onEdit },
    resource: ResourcesTabsEnum.Quizzes,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.quizzes.addBtn'}
        fetchData={refetch}
        link={authRoutes.myResources.newQuiz.path}
        placeholder={'myResourcesPage.quizzes.searchInput'}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        sortOptions={sortOptions}
      />
      {isLoading || !quizzes ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Quiz> {...props} />
      )}
    </Box>
  )
}

export default QuizzesContainer
