import { useState, useCallback, FC, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import { CourseService } from '~/services/course-service'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import CoursesFilterBar from '~/containers/find-course/courses-filter-bar/CoursesFilterBar'
import MyCorsesCardsList from '~/containers/my-courses/my-courses-container/MyCorsesCardsList'

import { defaultResponses } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { initialSort } from '~/containers/find-course/courses-filter-block/CoursesFilterBlock.constants'
import { styles } from '~/containers/cooperation-details/add-course-modal-modal/AddCourseTemplateModal.styles'
import { ButtonVariantEnum, ItemsWithCount, Course, SortEnum } from '~/types'

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

  const getCourses = useCallback(() => CourseService.getCourses(), [])

  const { response, loading } = useAxios<ItemsWithCount<Course>>({
    service: getCourses,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const getItems = () => {
    return response.items
      .filter(
        (item) =>
          'title' in item &&
          item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort((a, b) => {
        const valueA = new Date(a.updatedAt).getTime()
        const valueB = new Date(b.updatedAt).getTime()

        return sort.order === SortEnum.Asc ? valueA - valueB : valueB - valueA
      })
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onSearchReset = () => {
    setSearchValue('')
  }

  const onCreateCourse = () => {
    closeModal()
    navigate(authRoutes.myCourses.newCourse.path)
  }

  const scrollableContent = getItems().length ? (
    <MyCorsesCardsList
      items={getItems()}
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
        <InputWithIcon
          endAdornment={<SearchIcon sx={styles.searchIcon} />}
          onChange={onSearchChange}
          onClear={onSearchReset}
          placeholder={t('common.search')}
          sx={styles.searchInput}
          value={searchValue}
        />
        <CoursesFilterBar
          onValueChange={onRequestSort}
          value={`${sort.orderBy} ${sort.order}`}
        />
      </Box>

      <SimpleBar style={styles.cardsScroll}>
        {loading ? (
          <Loader containerSx={styles.loaderWrapper} pageLoad size={50} />
        ) : (
          scrollableContent
        )}
      </SimpleBar>

      <Box sx={styles.buttonsArea}>
        <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
          {t('common.cancel')}
        </AppButton>
        <AppButton>{t('common.add')}</AppButton>
      </Box>
    </Box>
  )
}

export default AddCourseTemplateModal
