import { Box,Typography, Button } from '@mui/material'
import CardWithImage from '~/components/card-with-image/CardWithImage'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { ModalContext } from '~/context/modal-context'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { mentorCardBoxArray } from '~/containers/guest-home-page/how-it-works/mentorCardBoxArray'

export const styles = {
  wrap:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  }
}

const titleVariant = {
  xs: 'h6'
}

const descriptionVariant = {
  xs: 'subtitle2'
}

const LearnFromExperts = () => {
  const { t } = useTranslation()
  const { setModal } = useContext(ModalContext)

  const openDialog = (type) => {
    setModal(<SignupDialog type={ type } />)
  }

  return (
    <Box sx={ styles.wrap }>
      { mentorCardBoxArray.map((item, key) => (
        <CardWithImage
          description={ t(item.description) }
          descriptionVariant={ descriptionVariant }
          image={ item.image }
          key={ key }
          side={ key % 2 === 0 ? 'right' : 'left' }
          title={ t(item.title) }
          titleVariant={ titleVariant }
        />
      )) }

      <Button onClick={ () => openDialog('mentor') } sx={ { padding: '16px 32px', mt: '34px' } } variant="contained">
        <Typography>
          Become a mentor
        </Typography>
      </Button>
    </Box>
  )
}

export default LearnFromExperts
