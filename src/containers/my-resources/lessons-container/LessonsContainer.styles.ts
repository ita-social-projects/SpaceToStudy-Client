import { TypographyVariantEnum } from '~/types'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
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
  dateTitle: captionTitle
}
