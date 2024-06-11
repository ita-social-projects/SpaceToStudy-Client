import { TypographyVariantEnum } from '~/types'

const styles = {
  quizzesWrapper: {
    maxWidth: '936px',
    width: '100%',
    mx: 'auto'
  },
  titleWithDescription: {
    title: { typography: TypographyVariantEnum.H5, mb: '16px' },
    description: {
      typography: TypographyVariantEnum.Body1,
      color: 'primary.600'
    }
  },
  divider: { color: 'primary.300', my: '32px' },
  finishBlock: {
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
    root: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  points: {
    root: { display: 'flex', alignItems: 'center', gap: '8px', mt: '8px' },
    chip: {
      bgcolor: 'primary.900',
      borderRadius: 1,
      fontWeight: 600,
      color: 'white',
      typography: TypographyVariantEnum.Subtitle2,
      p: '4px'
    },
    title: {
      typography: TypographyVariantEnum.Subtitle2,
      fontWeight: '600',
      color: 'primary.600'
    }
  },
  selectableQuestionQuizWrapper: {
    root: { mb: '40px' }
  }
}

export default styles
