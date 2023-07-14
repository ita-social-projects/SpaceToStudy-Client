import { forwardRef, useEffect } from 'react'

import Container from '@mui/material/Container'

import { styles } from '~/components/page-wrapper/PageWrapper.styles'
import { useModalContext } from '~/context/modal-context'
import { spliceSx } from '~/utils/helper-functions'

const PageWrapper = ({ children, sx, ...rest }, ref) => {
  const { closeModal } = useModalContext()

  useEffect(() => {
    return () => closeModal()
  }, [closeModal])

  return (
    <Container
      maxWidth='xl'
      ref={ref}
      sx={spliceSx(styles.container, sx)}
      {...rest}
    >
      {children}
    </Container>
  )
}

export default forwardRef(PageWrapper)
