import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'

const style = {
  accordion: {
    borderRadius: '6px',
    mb: { md:'16px',sm:'8px' },
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
    fontSize: { md:'20px', sm:'13px' },
    lineHeight: { md:'28px', sm:'18px' },
    color: 'primary.900'
  },
  subHeading: {
    fontSize: { md:'14px', sm:'8px' },
    lineHeight: { md:'24px', sm:'12px' },
    color: 'white'
  },
  active: {
    backgroundColor: 'primary.800',
    borderRadius: '6px',
    boxShadow: '0px 3.19149px 3.82979px -1.91489px rgba(144, 164, 174, 0.2), 0px 5.74468px 7.65957px 0.638298px rgba(144, 164, 174, 0.14), 0px 1.91489px 10.2128px 1.2766px rgba(144, 164, 174, 0.12)',
    mb: { md:'16px',sm:'8px' },
    '& h6': {
      color: 'white'
    }
  }
}

const Accordions = ({ items, onChange ,activeIndex,styles }) => {

  const { t } = useTranslation()

  return (
    <Box sx={ { ...styles } }>
      { items.map((item,index) => 
        (
          <Accordion
            disableGutters='true'
            expanded={ activeIndex === index }
            key={ index }
            onChange={ ()=> onChange(index) }
            sx={ activeIndex === index ? style.active : style.accordion }
          >
            <AccordionSummary>
              <Typography sx={ style.heading } variant={ 'h6' }>
                { t(item.heading) }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={ style.subHeading } variant={ 'body1' }>
                { t(item.subHeading) }
              </Typography>
            </AccordionDetails>
          </Accordion>
        )) }
    </Box>
    
  )
}

export default Accordions

