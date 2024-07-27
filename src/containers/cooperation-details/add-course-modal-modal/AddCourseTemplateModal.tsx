import { useState, useCallback, FC, ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SelectChangeEvent } from '@mui/material/Select'
import SimpleBar from 'simplebar-react'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { useFilterQuery } from '~/hooks/use-filter-query'
import { CourseService } from '~/services/course-service'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'
import MyCorsesCardsList from '~/containers/my-courses/my-courses-container/MyCorsesCardsList'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import CoursesFilters from '~/containers/find-course/courses-filters/CoursesFilters'

import { coursesDefaultFilters } from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal.constants'
import { defaultResponses } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { initialSort } from '~/containers/find-course/courses-filter-bar/CorseFilterBar.constants'
import { styles } from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal.styles'
import {
  ButtonVariantEnum,
  ItemsWithCount,
  Course,
  SortEnum,
  CategoryNameInterface,
  SubjectNameInterface,
  ProficiencyLevelEnum,
  UserRole,
  UserResponse
} from '~/types'
import {
  setIsActivityCreated,
  setIsAddedClicked,
  setSelectedCourse
} from '~/redux/features/cooperationsSlice'

interface AddCourseTemplateModalProps {
  closeModal: () => void
}

const AddCourseTemplateModal: FC<AddCourseTemplateModalProps> = ({
  closeModal
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { sort, onRequestSort } = useSort({ initialSort })
  const [searchValue, setSearchValue] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const dispatch = useAppDispatch()
  const [selectedItem, setSelectedItem] = useState<Course | null>(null)
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { filters, filterQueryActions } = useFilterQuery({
    defaultFilters: coursesDefaultFilters
  })

  const onCourseSelect = (course: Course) => {
    setSelectedItem(course)
    dispatch(setSelectedCourse(course))
  }

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { loading: userLoading, response: user } =
    useAxios<UserResponse | null>({
      service: getUserData,
      defaultResponse: null
    })

  const getCourses = useCallback(() => CourseService.getCourses(), [])

  const { response, loading } = useAxios<ItemsWithCount<Course>>({
    service: getCourses,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const { updateFiltersInQuery, resetFilters } = filterQueryActions

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onSearchReset = () => {
    setSearchValue('')
  }

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    updateFiltersInQuery({ category: value?._id ?? '', subject: '' })
  }

  const onSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    updateFiltersInQuery({ subject: value?._id ?? '' })
  }

  const onLevelChange = (e: SelectChangeEvent<ProficiencyLevelEnum[]>) => {
    const selectedProficiencyLevels = e.target.value as ProficiencyLevelEnum[]
    updateFiltersInQuery({ proficiencyLevel: selectedProficiencyLevels })
  }

  const onCreateCourse = () => {
    closeModal()
    navigate(authRoutes.myCourses.newCourse.path)
  }

  const onCancel = () => {
    closeModal()
    resetFilters()
  }

  const onAdd = () => {
    dispatch(setIsAddedClicked(true))
    dispatch(setIsActivityCreated(true))
    closeModal()
  }

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters)
  }

  const getItems = () => {
    return response.items
      .filter(
        (item) =>
          'title' in item &&
          item.title.toLowerCase().includes(searchValue.toLowerCase()) &&
          (!filters.category || item.category?._id === filters.category) &&
          (!filters.subject || item.subject?._id === filters.subject) &&
          (!filters.proficiencyLevel.length ||
            filters.proficiencyLevel.some(
              (level) => item.proficiencyLevel?.includes(level)
            ))
      )
      .sort((a, b) => {
        const valueA = new Date(a.updatedAt).getTime()
        const valueB = new Date(b.updatedAt).getTime()

        return sort.order === SortEnum.Asc ? valueA - valueB : valueB - valueA
      })
  }

  const scrollableContent = getItems().length ? (
    <MyCorsesCardsList
      items={getItems()}
      onCourseSelect={onCourseSelect}
      selectedCourse={selectedItem}
      sx={styles.card}
      withMenu={false}
      wrapperStyles={styles.cardsWrapper}
    />
  ) : (
    <NotFoundResults
      buttonText={`${t('myCoursesPage.buttonLabel')} +`}
      description={t('myCoursesPage.notFound.largeDescription')}
      onClick={onCreateCourse}
      sx={styles.notFound}
    />
  )

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t('cooperationDetailsPage.addCourseModal.description')}
        style={styles.titleWithDescription}
        title={t('cooperationDetailsPage.addCourseModal.title')}
      />

      <Box sx={styles.toolbar}>
        <Box sx={styles.toolbarContainer}>
          <InputWithIcon
            endAdornment={<SearchIcon sx={styles.searchIcon} />}
            onChange={onSearchChange}
            onClear={onSearchReset}
            placeholder={t('common.search')}
            sx={styles.searchInput}
            value={searchValue}
          />
          <Box onClick={toggleFilters} sx={styles.filtersBtn}>
            <FiltersToggle />
          </Box>
        </Box>
        <CoursesFilterBar
          onValueChange={onRequestSort}
          value={`${sort.orderBy} ${sort.order}`}
        />
      </Box>

      {showFilters && (
        <CoursesFilters
          filters={filters}
          onCategoryChange={onCategoryChange}
          onLevelChange={onLevelChange}
          onSubjectChange={onSubjectChange}
          resetFilters={resetFilters}
          user={user}
          userLoading={userLoading}
        />
      )}

      <SimpleBar style={styles.cardsScroll(showFilters)}>
        {loading || userLoading ? (
          <Loader containerSx={styles.loaderWrapper} pageLoad size={50} />
        ) : (
          scrollableContent
        )}
      </SimpleBar>

      <Box sx={styles.buttonsArea}>
        <AppButton onClick={onCancel} variant={ButtonVariantEnum.Tonal}>
          {t('common.cancel')}
        </AppButton>
        <AppButton disabled={!selectedItem} onClick={onAdd}>
          {t('common.add')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default AddCourseTemplateModal
