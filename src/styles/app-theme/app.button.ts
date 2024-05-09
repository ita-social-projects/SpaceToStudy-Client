declare module '@mui/material/styles' {
  interface ButtonVariants {
    tonal: React.CSSProperties
    containedLight: React.CSSProperties
    danger: React.CSSProperties
    base: React.CSSProperties
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    extraLarge: true
  }
  interface ButtonPropsVariantOverrides {
    tonal: true
    containedLight: true
    danger: true
    base: true
  }
}

export {}
