import { SxProps } from '@mui/material';
import { AccordionSx } from '~/types';

export interface MultiAccordionWithTitleSx extends AccordionSx {
    [key: string]: SxProps
}