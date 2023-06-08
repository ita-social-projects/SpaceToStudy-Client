import { FC } from 'react'

import Container from '@mui/material/Container'
import { SxProps } from '@mui/material/styles'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/page-wrapper/PageWrapper.styles'

interface PageWrapperProps {
  children: React.ReactNode
  sx?: SxProps
}

const PageWrapper: FC<PageWrapperProps> = ({ children, sx }) => {
  return (
    <Container maxWidth='xl' sx={spliceSx(styles.container, sx)}>
      {children}
    </Container>
  )
}

export default PageWrapper
