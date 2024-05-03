import { rootContainer } from '~/containers/edit-profile/common.style'
import { TypographyVariantEnum } from '~/types'

const { Subtitle1, Body2 } = TypographyVariantEnum

const titleWithDescription = {
  wrapper: { textAlign: 'left' },
  title: { typography: Subtitle1 },
  description: { typography: Body2, color: 'primary.500' }
}

export const styles = {
  root: {
    ...rootContainer,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4
  },
  titleWithDescription,
  createBtnContainer: {
    my: 3
  },
  accordionContainer: {
    mt: 2
  },
  createCategoryButton: {
    maxWidth: '664px',
    width: '100%'
  }
}
