import { ErrorOutlineRounded } from '@mui/icons-material'
import { styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CooperationActionModal from '~/containers/my-cooperations/cooperation-action-modal/CooperationActionModal'
import Button from '~/design-system/components/button/Button'

interface AcceptCooperationClosureProps {
  user: string
  onAccept: () => void
}

const BoldText = styled('span')({
  fontWeight: 500
})

const AcceptCooperationClosing: React.FC<AcceptCooperationClosureProps> = ({
  user,
  onAccept
}) => {
  const { t } = useTranslation()

  return (
    <CooperationActionModal
      actionButtons={
        <Button color='tonal-error' onClick={onAccept} size='xs'>
          {t('cooperationDetailsPage.acceptBtn')}
        </Button>
      }
      description={
        <>
          <BoldText>{user}</BoldText>
          {t('cooperationDetailsPage.closingMessage1')}
          <BoldText>{t('cooperationDetailsPage.accessDuration')}</BoldText>
          {t('cooperationDetailsPage.closingMessage2')}
        </>
      }
      icon={<ErrorOutlineRounded />}
      title={t('titles.acceptCooperationClosing')}
    />
  )
}

export default AcceptCooperationClosing
