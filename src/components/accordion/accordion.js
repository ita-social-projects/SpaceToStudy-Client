import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

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

const data = [ 
  {
    id: 'panel1',
    heading:'Flexible Location', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    id: 'panel2',
    heading:'Individual Time', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    id: 'panel3',
    heading:'Free choice of teachers', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    
    id: 'panel4',
    heading:'Digital Communication', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  }
]

const Accordions = () => {
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  const { t } = useTranslation()
  return (
    data.map(panel => {
      return(
        <Accordion
          disableGutters="true"
          expanded={ expanded === panel.id }
          key={ panel.id }
          onChange={ handleChange(panel.id) }
          sx={ expanded === panel.id ? style.active : style.accordion }
        > 
          <AccordionSummary>
            <Typography sx={ style.heading }>
              { panel.heading }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={ style.subHeading }>
              { panel.subHeading }
            </Typography>
          </AccordionDetails>
        </Accordion>
   
      )
    }) 
  
  ) 
}

export default Accordions

