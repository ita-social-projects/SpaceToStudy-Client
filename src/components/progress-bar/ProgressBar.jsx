import React, { useState } from 'react'
import { makeStyles, styled } from '@mui/styles'
import {
  Box,
  Typography,
  LinearProgress,
  linearProgressClasses
} from '@mui/material'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5
    // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  }
}))

const useStyles = makeStyles({
  progressBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '16px'
  }
})

const ProgressBar = () => {
  const classes = useStyles()
  const [progress, setProgress] = useState(0)

  const handleChange = (event) => {
    const checkedItems = Array.from(
      event.target.querySelectorAll('input[type="checkbox"]:checked')
    )
    const newProgress = checkedItems.length * 25
    setProgress(newProgress)
  }

  return (
    <Box className={classes.progressBar}>
      <Typography variant='h6'>Progress Bar</Typography>
      <Typography variant='body1'>Description of the progress</Typography>
      <BorderLinearProgress
        style={{
          backgroundColor: progress === 100 ? '#4caf50' : '#f44336',
          transition: 'background-color 0.5s ease'
        }}
        value={progress}
        variant='determinate'
      />
      <div>
        <label>
          <input onChange={handleChange} type='checkbox' />
          Item 1
        </label>
      </div>
      <div>
        <label>
          <input onChange={handleChange} type='checkbox' />
          Item 2
        </label>
      </div>
      <div>
        <label>
          <input onChange={handleChange} type='checkbox' />
          Item 3
        </label>
      </div>
      <div>
        <label>
          <input onChange={handleChange} type='checkbox' />
          Item 4
        </label>
      </div>
    </Box>
  )
}

export default ProgressBar
