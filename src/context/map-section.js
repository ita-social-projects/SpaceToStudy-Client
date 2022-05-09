import React from 'react'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const style = {
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0px',
    position: 'absolute',
    maxWidth: '1128px',
    maxheight: '470px',
    top: '360px'
  },
  image: {
    border: '2px solid black',
    width: '744px',
    height: '470px',
    mr: '24px'
  },
  accordion: {
    borderRadius: '6px',
    mb: '24px',
    backgroundColor: '#37474F',
    boxShadow: 'none'
  },
  accordionSummary: {
    '&:hover': {
      backgroundColor: '#ECEFF1',
      transition: '1s',
      borderRadius: '6px'
    }
    // '&:active': { backgroundColor: '#37474F' }
  },
  accordionDetails: {},

  heading: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '28px',
    color: '#263238'
    // '&active': {
    //   color: '#FFFFFF'
    // }
  },
  subHeading: {
    color: '#FFFFFF'
  }
}

const MapSection = () => {
  const [expandedPanel, setExpandedPanel] = useState(false)

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false)
  }

  return (
    <Box sx={style.section}>
      <Box sx={style.container}>
        <Box sx={style.image}></Box>
        <Box>
          <Accordion
            defaultExpanded="true"
            disableGutters="true"
            expanded={expandedPanel === 'panel1'}
            onChange={handleAccordionChange('panel1')}
            sx={style.accordion}
          >
            <AccordionSummary sx={style.accordionSummary}>
              <Typography sx={style.heading}>Flexible Location</Typography>
            </AccordionSummary>
            <AccordionDetails sx={style.accordionDetails}>
              <Typography sx={style.subHeading}>
                It is a long established fact that a reader will
                <br />
                be distracted by the readable content of a
                <br />
                page when looking at its layout.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            disableGutters="true"
            expanded={expandedPanel === 'panel2'}
            onChange={handleAccordionChange('panel2')}
            sx={style.accordion}
          >
            <AccordionSummary sx={style.accordionSummary}>
              <Typography sx={style.heading}>Individual Time</Typography>
            </AccordionSummary>
            <AccordionDetails sx={style.accordionDetails}>
              <Typography sx={style.subHeading}>
                It is a long established fact that a reader will
                <br />
                be distracted by the readable content of a
                <br />
                page when looking at its layout.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            disableGutters="true"
            expanded={expandedPanel === 'panel3'}
            onChange={handleAccordionChange('panel3')}
            sx={style.accordion}
          >
            <AccordionSummary sx={style.accordionSummary}>
              <Typography sx={style.heading}>Free choice of teachers</Typography>
            </AccordionSummary>
            <AccordionDetails sx={style.accordionDetails}>
              <Typography sx={style.subHeading}>
                It is a long established fact that a reader will
                <br />
                be distracted by the readable content of a
                <br />
                page when looking at its layout.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            disableGutters="true"
            expanded={expandedPanel === 'panel4'}
            onChange={handleAccordionChange('panel4')}
            sx={style.accordion}
          >
            <AccordionSummary sx={style.accordionSummary}>
              <Typography sx={style.heading}>Digital Communication</Typography>
            </AccordionSummary>
            <AccordionDetails sx={style.accordionDetails}>
              <Typography sx={style.subHeading}>
                It is a long established fact that a reader will
                <br />
                be distracted by the readable content of a
                <br />
                page when looking at its layout.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  )
}

export default MapSection
