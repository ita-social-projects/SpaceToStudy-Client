export const styles = {
  paper: {
    width: '420px',
    padding: '32px'
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    color: 'primary.700',
    mr: '7px'
  },
  title: {
    color: 'primary.700',
    lineHeight: '24px',
    typography: 'TypographyVariantEnum.H6'
  },
  boldText: {
    display: 'inline-block',
    fontWeight: 500
  },
  categorySelect: {
    mt: '32px',
    color: 'basic.bismark'
  },
  subjectSelect: {
    mt: '16px',
    color: 'basic.bismark'
  },
  titleMargin: {
    mb: '10px;'
  },
  checkboxContainer: {
    mt: '32px'
  },
  checkboxTitleMargin: {
    mb: '20px'
  },
  clearButtonMb: {
    mb: '16px'
  },
  labelContainer: {
    display: 'flex'
  },
  disabledTitle: {
    color: 'basic.gray'
  },
  inlineBlock: (isBold: boolean) => ({
    display: 'inline-block',
    fontWeight: isBold ? 500 : 400
  })
}
