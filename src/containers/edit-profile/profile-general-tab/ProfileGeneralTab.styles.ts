import palette from '~/styles/app-theme/app.pallete'
import { commonShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum, VisibilityEnum } from '~/types'

const { Subtitle1, Body2, Caption, H6 } = TypographyVariantEnum

const titleWithDescription = {
  wrapper: { textAlign: 'left' },
  title: { typography: Subtitle1 },
  description: { typography: Body2, color: 'primary.500' }
}

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    rowGap: '10px',
    maxWidth: '768px',
    width: '100%',
    m: '0 auto',
    p: '20px 40px',
    backgroundColor: 'basic.white',
    color: 'basic.black',
    borderRadius: '4px',
    boxShadow: commonShadow
  },
  headerTitleWithDesc: { ...titleWithDescription, title: { typography: H6 } },
  avatar: {
    root: { display: 'flex', columnGap: '34px', my: '20px' },
    img: { width: '108px', height: '108px' },
    textWithButtons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    titleWithDesc: {
      ...titleWithDescription,
      description: { typography: Caption, color: 'primary.500' }
    },
    buttons: { display: 'flex', columnGap: '10px', height: '40px' }
  },
  section: { display: 'flex', flexDirection: 'column', rowGap: '15px' },
  sectionsTitleWithDesc: { ...titleWithDescription },
  dividedInputs: { display: 'flex', columnGap: '10px' },
  professionalSummaryLabel: (text: string) => ({
    color: palette.primary[400],
    top: '-2px',
    ...(text && { visibility: VisibilityEnum.Hidden })
  }),
  languageInput: { maxWidth: '300px', width: '100%', mb: '20px' },
  linkAdornment: { '& > p': { color: 'primary.500' } }
}