import { FC, forwardRef, useEffect } from 'react'

import Container, { ContainerProps } from '@mui/material/Container'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/page-wrapper/PageWrapper.styles'
import { useModalContext } from '~/context/modal-context'

const PageWrapper: FC<ContainerProps> = forwardRef(
  ({ children, sx, ...rest }, ref) => {
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
)

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
