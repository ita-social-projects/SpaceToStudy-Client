import { FC, useEffect } from 'react'

import Container, { ContainerProps } from '@mui/material/Container'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/page-wrapper/PageWrapper.styles'
import { useModalContext } from '~/context/modal-context'

const PageWrapper: FC<ContainerProps> = ({ children, sx, ...rest }) => {
  const { closeModal } = useModalContext()

  useEffect(() => {
    return () => closeModal()
  }, [closeModal])

  return (
    <Container maxWidth='xl' sx={spliceSx(styles.container, sx)} {...rest}>
      {children}
    </Container>
  )
}

export default PageWrapper
