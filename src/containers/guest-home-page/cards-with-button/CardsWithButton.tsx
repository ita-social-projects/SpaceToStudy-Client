import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Transition, {
  TransitionChildren
} from 'react-transition-group/Transition'

import Box from '@mui/material/Box'
import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import dots from '~/assets/img/guest-home-page/dots.svg'

import {
  AccordionWithImageItem,
  PositionEnum,
  SizeEnum,
  UserRoleEnum
} from '~/types'
import { styles } from '~/containers/guest-home-page/cards-with-button/CardsWithButton.styles'

interface CardsWithButtonProps {
  array: AccordionWithImageItem[]
  role: UserRoleEnum
  btnText: string
  isTutor: boolean
}

const CardsWithButton: FC<CardsWithButtonProps> = ({
  array,
  role,
  btnText,
  isTutor
}) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const openDialog = () => {
    openModal({ component: <SignupDialog type={role} /> })
  }

  const cards = (state: TransitionChildren) =>
    array.map((item, key) => {
      const boxSide = key % 2 === 0 ? PositionEnum.Right : PositionEnum.Left

      return (
        <Box
          key={item.title}
          sx={[
            styles[boxSide].box,
            state === 'exiting' && styles[boxSide].slidesIn,
            state === 'entering' && styles[boxSide].slidesIn
          ]}
        >
          <Box sx={styles[boxSide].clearBox} />
          <Box sx={styles.image}>
            <Box component='img' src={item.image} />
            <Box className='dots' component='img' src={dots} />
          </Box>
          <TitleWithDescription
            description={t(item.description)}
            style={styles[boxSide]}
            title={t(item.title)}
          />
        </Box>
      )
    })

  return (
    <>
      <Transition in={isTutor} timeout={300}>
        {(state) => cards(state)}
      </Transition>
      <AppButton
        onClick={openDialog}
        size={SizeEnum.ExtraLarge}
        sx={styles.button}
      >
        {btnText}
      </AppButton>
    </>
  )
}

export default CardsWithButton
