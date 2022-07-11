import { Box } from '@mui/system'
import { Typography, Button, FormGroup } from '@mui/material'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'

const HowItWorks = () => {
  return (
    <Box>
        
      <Typography>How it works</Typography>

      <FormGroup>
        <Stack alignItems="center" direction="row" spacing={ 1 }>
          <Typography>Learn from Experts</Typography>
          <Switch defaultChecked inputProps={ { 'aria-label': 'ant design' } } />
          <Typography>Share your Experience</Typography>
        </Stack>
      </FormGroup>

      <Button variant="contained">
        <Typography>Start learning today</Typography>
      </Button>
    </Box>
  )
}

export default HowItWorks
