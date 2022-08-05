import { Box, Button } from '@mui/material'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalContext } from '~/context/modal-context'
import CardWithImage from '~/components/card-with-image/CardWithImage'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

const titleVariant = {
  xs: 'h6'
}

const descriptionVariant = {
  xs: 'subtitle2'
}

const StepsWithButton = ({ array, role, btnText }) => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const openDialog = (type) => {
    setModal(<SignupDialog type={ type } />)
  }

  const cards = useMemo(
    () =>
      array.map((item, key) => (
        <CardWithImage
          description={ t(item.description) }
          descriptionVariant={ descriptionVariant }
          image={ item.image }
          key={ key }
          position={ key % 2 === 0 ? 'right' : 'left' }
          title={ t(item.title) }
          titleVariant={ titleVariant }
        />
      )),
    [array]
  )
  return (
    <Box sx={ styles.wrap }>
      { cards }

      <Button onClick={ () => openDialog({ role }) } sx={ { p: '16px 32px', mt: '34px' } } variant="contained">
        { btnText }
      </Button>
    </Box>
  )
}

export default StepsWithButton
