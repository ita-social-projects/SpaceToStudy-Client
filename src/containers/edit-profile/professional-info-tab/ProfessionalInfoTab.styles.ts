import {
  rootContainer,
  updateProfileBtn,
  innerContainer
} from '~/containers/edit-profile/common.style'
import palette from '~/styles/app-theme/app.pallete'
import { PositionEnum, TypographyVariantEnum } from '~/types'

const { Subtitle1, Body2, H6 } = TypographyVariantEnum

const titleWithDescription = (
  titleTypographyVariant: TypographyVariantEnum
) => ({
  wrapper: { textAlign: PositionEnum.Left },
  title: { typography: titleTypographyVariant },
  description: { typography: Body2, color: palette.primary[500] }
})

export const styles = {
  root: {
    ...rootContainer,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4
  },
  professionalInfoInnerContainer: {
    ...innerContainer
  },
  mainTitleWithDescription: titleWithDescription(H6),
  titleWithDescription: titleWithDescription(Subtitle1),
  createBtnContainer: {
    my: 3
  },
  accordionContainer: {
    mt: 2
  },
  createCategoryButton: {
    maxWidth: '664px',
    width: '100%'
  },
  updateProfileBtn: {
    ...updateProfileBtn
  }
}
