import { TypographyVariantEnum } from '~/types'

export const styles = {
  lessonWrapper: {
    maxWidth: '936px',
    width: '100%',
    m: '24px auto 0'
  },
  titleWithDescription: {
    wrapper: { mb: '24px' },
    title: { typography: TypographyVariantEnum.H4, mb: '16px' },
    description: { typography: TypographyVariantEnum.Body2 }
  },
  content: {
    p: '16px 16px 0',
    '& :first-of-type': {
      mt: '0'
    },
    '& :last-child': {
      mb: '0'
    }
  },
  attachmentList: {
    pt: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  attachment: {
    backgroundColor: 'basic.grey',
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
    alignItems: 'center',
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
        border: 'none',
        p: '0'
      },
      description: {
        border: 'none'
      },
      titleActive: {
        color: 'primary.700'
      },
      titleInactive: {
        color: 'primary.700'
      }
    }
  }
}
