import { Button } from '@mui/material'
import { Box } from '@mui/system'

import backArrow from '~/assets/img/step-wrapper/backArrow.svg'
import nextArrow from '~/assets/img/step-wrapper/nextArrow.svg'

import { styles } from './step-wrapper.styles'

const StepWrapper = ({ activeStep, children, setActiveStep, steps }) => {
  const stepLabels = steps.map((step, index) => (
    <Box
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography="body2"
    >
      {step}
    </Box>
  ))

  const next = () => {
    if (activeStep === steps.length - 1) {
      //FINISH - SEND POST REQUEST
    } else {
      setActiveStep((prev) => prev + 1)
    }
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box>{children}</Box>
      <Box sx={styles.btnWrapper}>
        <Button
          disabled={activeStep === 0}
          onClick={back}
          sx={[styles.btn, { color: 'primary.500' }]}
          variant="outlined"
        >
          <Box alt="backArrow" component="img" src={backArrow}></Box>
          <Box sx={{ ml: '10px' }}>Back</Box>
        </Button>
        <Button onClick={next} sx={[styles.btn, { ml: '168px', color: 'primary.50' }]} variant="contained">
          <Box sx={{ mr: '10px' }}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Box>
          <Box alt="nextArrow" component="img" src={nextArrow}></Box>
        </Button>
      </Box>
    </Box>
  )
}

export default StepWrapper
