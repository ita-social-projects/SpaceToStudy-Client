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
    color: 'white'
  },
  active: {
    backgroundColor: 'primary.800',
    borderRadius: '6px',
    mb: '24px',
    '& p': {
      color: 'white'
    }
  }
}

const Accordions = ({ id,heading,subHeading, image, setImage, expanded, setExpanded }) => {

  const { t } = useTranslation()
    
  const handleChange = () => {
    setExpanded(id)
    setImage(image)
  }
 
  return (
    <Accordion
      disableGutters="true"
      expanded={ expanded === id }
      key={ id }
      onChange={ handleChange }
      sx={ expanded === id ? style.active : style.accordion }
    > 
      <AccordionSummary>
        <Typography sx={ style.heading }>
          { t(`${heading}`) }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={ style.subHeading }>
          { t(`${subHeading}`) }
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default Accordions

