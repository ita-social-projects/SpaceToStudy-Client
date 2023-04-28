const borderStyles = {
    borderWidth: '1px',
    borderColor: 'primary.100',
    borderStyle: 'solid',
    borderRadius: '6px'
}

export const styles = {
    title: {
        color: 'primary.700',
        mb: '18px',
    },
    icon: { color: 'primary.500', fontSize: '13px' },
    container: { padding: '35px 60px', ...borderStyles, margin: '10px' },
    accordion: {
        root: { borderRadius: '6px' },
        container: { ...borderStyles, mb: '16px', '&:last-child': { mb: 0 } },
        summary: {
            color: 'primary.500',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            mb: '0',
        },
        title: {
            ml: '13px',
        },
        caption: (icon: boolean) => ({
            ml: icon ? '27px' : '13px'
        }),
    }
}