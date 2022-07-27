import { useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { ModalContext } from '~/context/modal-context'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import info from '~/assets/img/guest-home-page/info.svg'

const style = {
  root: { m: { xs: '100px 10px', sm: '45px 20px 55px' } },
  img: { display: 'flex', margin: '0 auto' },
  wrapper: { maxWidth: '630px' },
  title: { typography: 'h5' },
  description: { typography: 'subtitle' }
}

const InfoPopup = ({ email }) => {
  const { t } = useTranslation()
  const { closeModal } = useContext(ModalContext)

  useEffect(() => {
    setTimeout(() => closeModal(), 5000)
  }, [closeModal])

  return (
    <Box sx={style.root}>
      <Box alt="info" component="img" src={info} sx={style.img} />

      <TitleWithDescription
        componentStyles={style.wrapper}
        description={t('login.weSentEmail') + email + t('login.emailArrive')}
        descriptionStyles={style.description}
        title={t('login.passwordReset')}
        titleStyles={style.title}
      />
    </Box>
  )
}

export default InfoPopup
