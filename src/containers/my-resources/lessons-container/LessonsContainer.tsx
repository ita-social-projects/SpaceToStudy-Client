import { useCallback, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useQuery from '~/hooks/use-query'
import usePagination from '~/hooks/table/use-pagination'

import { defaultResponses, snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import { type Lesson, ResourcesTabsEnum } from '~/types'
import { adjustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { useModalContext } from '~/context/modal-context'
import ChangeResourceConfirmModal from '~/containers/change-resource-confirm-modal/ChangeResourceConfirmModal'
import { getFullUrl } from '~/utils/get-full-url'

const LessonsContainer = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { openModal } = useModalContext()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = adjustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyLessons = useCallback(() => {
    return ResourceService.getUsersLessonsQuery({
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      sort,
      title: searchTitle.current,
      categories: selectedItems
    })
  }, [page, itemsPerPage, sort, searchTitle, selectedItems])

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id ?? ''),
    []
  )

  const {
    data: lessons,
    isLoading,
    error,
    refetch: fetchLessons
  } = useQuery({
    queryKey: [
      'lessons',
      page,
      itemsPerPage,
      sort,
      searchTitle.current,
      selectedItems
    ],
    queryFn: getMyLessons,
    options: {
      staleTime: Infinity
    }
  })

  const onEdit = (id: string) => {
    if (!lessons) {
      return
    }
    const resource = lessons.items.find((item) => item._id === id)
    openModal({
      component: (
        <ChangeResourceConfirmModal
          onConfirm={() => {
            return navigate(
              getFullUrl({
                pathname: authRoutes.myResources.editLesson.route,
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

  const handleFetchLessons = useCallback(async () => {
    await fetchLessons()
  }, [fetchLessons])

  useEffect(() => {
    if (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(error)
        })
      )
    }
  }, [error, dispatch])

  const props = {
    columns: columnsToShow,
    data: {
      response: lessons ?? defaultResponses.itemsWithCount,
      getData: handleFetchLessons
    },
    services: { deleteService: deleteLesson },
    itemsPerPage,
    actions: { onEdit },
    resource: ResourcesTabsEnum.Lessons,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText='myResourcesPage.lessons.addBtn'
        fetchData={handleFetchLessons}
        link={authRoutes.myResources.newLesson.path}
        placeholder='myResourcesPage.lessons.searchInput'
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
        sortOptions={sortOptions}
      />
      {isLoading || !lessons ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lesson> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
