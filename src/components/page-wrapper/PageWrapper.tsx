import { FC } from 'react'

import Container from '@mui/material/Container'
import { SxProps } from '@mui/material/styles'

import { styles } from '~/components/page-wrapper/PageWrapper.styles'

interface PageWrapperProps {
  children: React.ReactNode
  sx?: SxProps
}

const PageWrapper: FC<PageWrapperProps> = ({ children, sx }) => {
  return (
    <Container maxWidth='xl' sx={[styles.container, sx] as SxProps}>
      {children}
    </Container>
  )
}

export default PageWrapper
