import { TypographyVariantEnum } from '~/types'
import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
  table: roundedBorderTable,
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
