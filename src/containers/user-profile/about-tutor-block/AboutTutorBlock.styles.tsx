import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    my: { md: '30px', xs: '20px' },
    typography: { md: TypographyVariantEnum.H4, xs: TypographyVariantEnum.H5 }
  },
  wrapper: {
    width: '100%',
    px: { md: '15px', xs: '10px' },
    '& .MuiPaper-root': {
      borderTop: `1px solid ${palette.basic.lightGray}`
    },
    '& .MuiAccordionSummary-root': {
      p: { md: '24px', xs: '12px' }
    },
    '& .MuiAccordionSummary-content': {
      '> p': {
        fontWeight: 500,
        fontSize: { md: '20px', xs: '16px' },
        lineHeight: { md: '22px', xs: '16px' }
      }
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      '> svg': {
        width: { md: '34px', xs: '26px' },
        height: { md: '34px', xs: '26px' }
      }
    },
    '& .MuiAccordionDetails-root': {
      p: { md: '0 24px 24px', xs: '0 12px 12px' }
    },
    '& .MuiAccordion-root': {
      transition: 'background-color 0.2s ease-in-out'
    },
    '& .MuiAccordion-root:hover, & .MuiAccordion-root.Mui-expanded, & .MuiAccordion-root.Mui-expanded:hover':
      {
        backgroundColor: palette.basic.grey
      }
  },
  accordion: {
    fontWeight: { md: 500, xs: 400 },
    fontSize: { md: '24px', xs: '14px' },
    lineHeight: { md: '36px', xs: '28px' }
  }
}
