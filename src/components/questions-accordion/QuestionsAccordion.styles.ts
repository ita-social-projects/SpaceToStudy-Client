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
    container: { padding: '30px 60px 65px', ...borderStyles, margin: '10px' },
    icon: { color: 'primary.500', fontSize: '13px' },
    withShowMoreIcon: {
        accordion: { ...borderStyles, mb: '16px', '&:last-child': { mb: 0 }, '&::before': { display: 'none' } },
        summary: {
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            mb: '0',
        },
        title: (isActive: boolean) => ({
            ml: '13px',
            color: isActive ? 'primary.500' : 'primary.700'
        }),
        description: (icon: boolean) => ({
            ml: icon ? '27px' : '13px'
        })
    },
    noShowMoreIcon: {}
}
