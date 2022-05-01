import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'

const ConfirmDialog = ({ message, open, onConfirm, onDismiss }) => {
  return (
    <Dialog open={ open }>
      <DialogContent>
        { message }
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={ onDismiss } variant="contained">
          No
        </Button>
        <Button color="success" onClick={ onConfirm } variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
