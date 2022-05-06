import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'

const ConfirmDialog = ({ message, open, onConfirm, onDismiss }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={ open }>
      <DialogContent>
        { message }
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={ onDismiss } variant="contained">
          { t('common.no') }
        </Button>
        <Button color="success" onClick={ onConfirm } variant="contained">
          { t('common.yes') }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
