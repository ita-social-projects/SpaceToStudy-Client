import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import { useGetLessonsQuery } from '~/redux/sliceResources/resources'

import { defaultResponses } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import { Lesson, ResourcesTabsEnum } from '~/types'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'

const LessonsContainer = () => {
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )
  const queryArgs = {
    limit: itemsPerPage,
    skip: (page - 1) * itemsPerPage,
    sort,
    title: searchTitle.current,
    categories: selectedItems
  }

  const {
    data: response,
    isLoading,
    isSuccess,
    refetch
  } = useGetLessonsQuery(queryArgs)

  const handleRefetch = () => {
    void refetch()
  }

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id || ''),
    []
  )

  const onEdit = (id: string) => {
    navigate(createUrlPath(authRoutes.myResources.editLesson.path, id))
  }

  const props = {
    columns: columnsToShow,
    data: {
      response: isSuccess ? response : defaultResponses.itemsWithCount,
      getData: () => {
        void refetch()
      }
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
        btnText={'myResourcesPage.lessons.addBtn'}
        fetchData={handleRefetch}
        link={authRoutes.myResources.newLesson.path}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
      />
      {isLoading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lesson> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
