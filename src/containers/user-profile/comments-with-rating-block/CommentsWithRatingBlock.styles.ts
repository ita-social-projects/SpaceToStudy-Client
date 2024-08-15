import { SxProps, Theme } from '@mui/material'

export const styles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '20px', sm: '15px', md: '32px' },
    alignItems: 'center'
  } as SxProps<Theme>,
  container: {
    display: 'flex',
    gap: '80px',
    width: '100%',
    flexDirection: 'row',
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  } as SxProps<Theme>,
  innerBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    maxWidth: '250px',
    alignItems: 'center'
  } as SxProps<Theme>,
  title: {
    typography: { xs: 'button', sm: 'h5', md: 'h4' },
    mt: '100px'
  } as SxProps<Theme>
}
