import { SxProps } from '@mui/material';
import { AccordionSx } from '~/types';

export interface MultiAccordionWithTitleSx extends AccordionSx {
    title?: SxProps
    icon?: SxProps
    container?: SxProps
}