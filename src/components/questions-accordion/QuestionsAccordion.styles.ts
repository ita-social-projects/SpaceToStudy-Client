export const styles = {
    title: {
        color: 'primary.700',
        mb: '18px',
    },
    accordion: {
        container: {
            borderWidth: '1px',
            borderColor: 'primary.100',
            borderStyle: 'solid'
            // border: '2px solid black'
        },
        summary: {
            color: 'primary.500',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            mb: '0'
        },
        title: {
            ml: '13px',
        },
        caption: {
            ml: '27px'
        }
    }
}