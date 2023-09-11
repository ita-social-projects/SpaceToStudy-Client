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
    background: 'basic.grey',
    borderRadius: '5px',
    p: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    marginLeft: 'auto',
    backgroundColor: 'basic.grey',
    color: 'basic.black',
    minWidth: '97px',
    display: 'flex',
    alighnItems: 'center',
    columnGap: '16px',
    '&:hover': {
      backgroundColor: 'primary.100'
    }
  },
  editIcon: {
    width: { xs: '14px', sm: '16px' },
    ml: '5px'
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
