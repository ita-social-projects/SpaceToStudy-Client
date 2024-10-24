import { TypographyVariantEnum } from '~/types'

export const styles = {
  cardContainer: {
    width: '100%',
    maxWidth: '460px',
    minHeight: '400px',
    borderRadius: '8px',
    border: '1px',
    borderColor: 'basic.lightGrey',
    backgroundColor: 'basic.white',
    p: { xs: '20px 41px 40px', sm: '20px 41px 68px' },
    boxSizing: 'border-box',
    mt: '75px'
  },

  cardTitle: {
    typography: TypographyVariantEnum.H5,
    color: 'basic.darkGray',
    mb: '5px'
  },

  cardSubTitle: {
    typography: TypographyVariantEnum.Body2,
    color: 'basic.blueGray',
    mb: '15px'
  },

  select: {
    height: '40px',
    border: '1px solid',
    borderColor: 'basic.gray',
    '& .MuiSelect-select': {
      p: '8px 10px'
    }
  },

  selectedValue: {
    display: 'flex',
    gap: 1
  },

  selectAndButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    mb: 'auto',
    flexWrap: 'wrap',
    gap: '8px'
  },

  clearAllButton: {
    height: '40px',
    ml: 'auto',
    typography: TypographyVariantEnum.Body1,
    color: 'basic.darkGray'
  },

  chartAndLegendContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: '30px',
    gap: '15px'
  },

  legendContainer: {
    width: '146px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  legendRow: {
    display: 'flex',
    alignItems: 'center'
  },

  legendBoxIcon: (color: string) => ({
    width: '12px',
    height: '12px',
    backgroundColor: color,
    mr: 1,
    borderRadius: '50%'
  }),

  percentage: {
    ml: 'auto',
    typography: TypographyVariantEnum.Overline,
    color: 'basic.black'
  },

  totalStudents: {
    typography: TypographyVariantEnum.H5,
    color: 'basic.darkGray'
  },

  allStudents: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'basic.darkGray',
    textAlign: 'center'
  },

  category: {
    typography: TypographyVariantEnum.Overline,
    color: 'basic.black',
    textTransform: 'uppercase'
  },

  diagramContainer: {
    width: '170px',
    height: '170px',
    position: 'relative'
  },

  diagramInnerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}
