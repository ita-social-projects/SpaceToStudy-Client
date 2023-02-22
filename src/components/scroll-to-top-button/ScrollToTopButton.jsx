import {useState, useEffect} from 'react'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import {styles} from '~/components/scroll-to-top-button/ScrollToTopButton.styles'


const ScrollToTopButton = ({element}) => {
    const [isVisible, setIsVisible] = useState(false)

    const scroll = () => (element.current.scrollTop > 450 ? setIsVisible(true) : setIsVisible(false))


    useEffect(() => {
        element.current.addEventListener('scroll', scroll)
        return () => element.current.removeEventListener('scroll', scroll)
    }, [])

    const goToTop = () => {
        element.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        isVisible && (
            <Box sx={styles.root}>
                <IconButton onClick={goToTop} sx={styles.button}>
                    <ArrowUpwardRoundedIcon sx={styles.icon}/>
                </IconButton>
            </Box>
        )
    )
}

export default ScrollToTopButton
