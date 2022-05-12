import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Typography } from '@mui/material'

const style = {
  accordion: {
    borderRadius: '6px',
    mb: '24px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'primary.50',
      borderRadius: '6px'
    },
    '&::before': {
      display: 'none'
    }
  },
  heading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '28px',
    color: 'primary.900'
  },
  subHeading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '24px',
    color: '#FFFFFF'
  },
  active: {
    backgroundColor: 'primary.800',
    borderRadius: '6px',
    mb: '24px',
    '& p': {
      color: '#FFFFFF'
    }
  }
}


const Accordions = ({ id,heading,subHeading }) => {
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  return(
    <Accordion
      disableGutters="true"
      expanded={ expanded === id }
      onChange={ handleChange(id) }
      sx={ expanded === id ? style.active : style.accordion }
    >
      <AccordionSummary>
        <Typography sx={ style.heading }>
          { heading }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={ style.subHeading }>
          { subHeading }
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default Accordions
