import { TypographyVariantEnum } from '~/types'
import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
  table: roundedBorderTable,
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: '24px'
  },
  lessonTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  lessonIcon: {
    mr: '32px'
  },
  lessonTitle: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.900'
  },
  attachmentsTitle: captionTitle,
  dateTitle: captionTitle,
  addLessonBtn: {
    py: '19px',
    px: '40px'
  },
  searchIcon: { color: 'primary.700' },
  input: {
    flex: 1,
    maxWidth: '285px',
    border: '1px solid',
    borderColor: 'primary.500',
    borderRadius: '6px'
  },
  icon: {
    width: { xs: '18px', sm: '22px' },
    color: 'primary.100'
  }
}
