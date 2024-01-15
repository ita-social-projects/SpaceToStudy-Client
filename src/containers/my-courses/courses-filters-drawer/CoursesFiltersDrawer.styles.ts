export const styles = {
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    mb: '32px'
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
  addedFiled: {
    '& p': {
      mb: '10px'
    }
  },
  inlineBlock: (isBold: boolean) => ({
    display: 'inline-block',
    fontWeight: isBold ? 500 : 400
  })
}
