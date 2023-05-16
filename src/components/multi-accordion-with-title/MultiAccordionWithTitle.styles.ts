import { MultiAccordionWithTitleSx } from "~/types"

const borderStyles = {
    borderWidth: '1px',
    borderColor: 'primary.100',
    borderStyle: 'solid',
    borderRadius: '6px'
}

export const styles: MultiAccordionWithTitleSx = {
    title: {
        color: 'primary.700',
        m: { xs: '16px 20px 10px', md: '35px 60px 18px 60px' },
    },
    container: { ...borderStyles, pb: '65px', backgroundColor: 'white' },
    icon: { color: 'primary.500', fontSize: '13px' },
    withIcon: {
        accordion: { ...borderStyles, mb: '16px', '&:last-child': { mb: 0 }, '&::before': { display: 'none' }, m: { xs: '10px 14px', md: '0 60px 16px' }, p: '12px 0' },
        summary: {
            display: 'flex',
            flexDirection: { xs: 'row-reverse', md:'row' },
            alignItems: 'center',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            mb: '0',
        },
        titleActive: {
            ml: '13px',
            color: 'primary.500'
        },
        titleInactive: {
            ml: '13px',
            color: 'primary.700'
        },
        description: {
            ml: { xs: '14px', md: '15px' },
            color: { xs: 'primary.600' }
        }
    }
}
