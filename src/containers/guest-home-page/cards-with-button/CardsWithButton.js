import { Box, Button } from '@mui/material'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalContext } from '~/context/modal-context'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { styles } from '~/containers/guest-home-page/cards-with-button/cards-with-button.style'

const titleVariant = {
  xs: 'h6'
}

const descriptionVariant = {
  xs: 'subtitle2'
}

const CardsWithButton = ({ array, role, btnText }) => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const openDialog = (type) => {
    setModal(<SignupDialog type={ type } />)
  }

  const cards = useMemo(
    () =>
      array.map((item, key) => (
        <Box key={ key } sx={ styles[key % 2 === 0 ? 'right' : 'left'].box }>
          <Box sx={ styles[key % 2 === 0 ? 'right' : 'left'].clearBox }></Box>
          <Box component="img" src={ item.image } sx={ styles[key % 2 === 0 ? 'right' : 'left'].image }></Box>
          <TitleWithDescription
            description={ t(item.description) }
            descriptionVariant={ descriptionVariant }
            style={ styles[key % 2 === 0 ? 'right' : 'left'] }
            title={ t(item.title) }
            titleVariant={ titleVariant }
          />
        </Box>
      )),

    [array]
  )
  return (
    <Box sx={ styles.wrap }>
      { cards }

      <Button onClick={ () => openDialog(role) } sx={ { p: '16px 32px', mt: '34px' } } variant="contained">
        { btnText }
      </Button>
    </Box>
  )
}

export default CardsWithButton
