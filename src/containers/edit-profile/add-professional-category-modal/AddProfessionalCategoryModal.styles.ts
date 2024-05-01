import palette from '~/styles/app-theme/app.pallete'
import { PositionEnum, TypographyVariantEnum } from '~/types'

const { Subtitle1, Body2 } = TypographyVariantEnum

const titleWithDescription = {
  wrapper: { textAlign: PositionEnum.Left },
  title: { typography: Subtitle1 },
  description: { typography: Body2, color: palette.primary[500] }
}

export const styles = {
  root: { p: 5 },
  formWrapper: {
    mt: 2,
    my: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '& > :not(:first-of-type)': {
      marginLeft: '58px'
    }
  },
  addOneMoreSubjectButton: {
    marginLeft: '58px'
  },
  checkbox: {
    padding: '12px',
    '&.Mui-disabled': {
      color: palette.primary[100]
    }
  },
  checkboxGroup: {
    display: 'flex',
    gap: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: 2
  },
  titleWithDescription
}
