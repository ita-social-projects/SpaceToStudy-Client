import { Box, Button } from '@mui/material'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ModalContext } from '~/context/modal-context'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { styles } from '~/containers/guest-home-page/cards-with-button/cards-with-button.style'
import dots from '~/assets/img/guest-home-page/dots.svg'

const titleStyles = {
  typography: { xs: 'h6' }
}

const descriptionStyles = {
  typography: { xs: 'subtitle2' }
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
          <Box sx={ styles[key % 2 === 0 ? 'right' : 'left'].clearBox } />
          <Box sx={ styles.image }>
            <Box component='img' src={ item.icon } />
            <Box
              className='dots' component='img' src={ dots }
              sx={ styles.dots }
            />
          </Box>
          <TitleWithDescription
            description={ t(item.description) }
            descriptionStyles={ descriptionStyles }
            style={ styles[key % 2 === 0 ? 'right' : 'left'] }
            title={ t(item.title) }
            titleStyles={ titleStyles }
          />
        </Box>
      )),

    [array, t]
  )
  return (
    <Box sx={ styles.wrap }>
      { cards }

      <Button onClick={ () => openDialog(role) } sx={ styles.button } variant='contained'>
        { btnText }
      </Button>
    </Box>
  )
}

export default CardsWithButton
