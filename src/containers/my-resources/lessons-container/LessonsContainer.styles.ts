import { TypographyVariantEnum } from '~/types'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
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
  newLessonIcon: { fontSize: '25px', marginLeft: '13px', fontWeight: '400' }
}
