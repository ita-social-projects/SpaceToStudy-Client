import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  titleWithDescription: {
    wrapper: { mb: '24px' },
    title: { typography: TypographyVariantEnum.H4, mb: '16px' },
    description: { typography: TypographyVariantEnum.Body2 }
  },
  attachmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  attachment: {
    background: palette.basic.grey,
    borderRadius: '5px',
    p: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    background: palette.basic.grey,
    '&:hover': {
      backgroundColor: 'primary.100'
    },
    color: palette.basic.black,
    maxWidth: '97px'
  },
  editIcon: {
    width: { xs: '14px', sm: '16px' },
    ml: '5px'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  accordion: {
    withIcon: {
      accordion: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        mb: '24px'
      },
      inactive: {
        '&::before': { display: 'none' }
      },
      summary: {
        borderBottom: '1px solid',
        borderColor: 'primary.200'
      },
      details: {
        border: 'none'
      },
      description: {
        border: 'none'
      }
    }
  }
}
