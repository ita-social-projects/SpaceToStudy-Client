import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Transition from 'react-transition-group/Transition'
import { ModalContext } from '~/context/modal-context'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { styles } from '~/containers/guest-home-page/cards-with-button/CardsWithButton.styles'
import dots from '~/assets/img/guest-home-page/dots.svg'

const titleStyles = {
  typography: { xs: 'h6' }
}

const descriptionStyles = {
  typography: { xs: 'subtitle2' }
}

const CardsWithButton = ({ array, role, btnText, isStudent }) => {
  const { t } = useTranslation()
  const { openModal } = useContext(ModalContext)

  const openDialog = (type) => {
    openModal({ component: <SignupDialog type={ type } /> })
  }

  const cards = array.map((item, key) => {
    const boxSide = key % 2 === 0 ? 'right' : 'left'

    return (
      <Transition in={ isStudent } key={ key } timeout={ 1000 }>
        { (state) => (
          <Box
            sx={ [
              styles[boxSide].box,
              state === 'exiting' && styles[boxSide].slidesIn,
              state === 'entering' && styles[boxSide].slidesIn
            ] }
          >
            <Box sx={ styles[boxSide].clearBox } />
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
              style={ styles[boxSide] }
              title={ t(item.title) }
              titleStyles={ titleStyles }
            />
          </Box>
        ) }
      </Transition>
    )
  })

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
