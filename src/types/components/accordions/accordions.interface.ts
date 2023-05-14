import { SxProps } from "@mui/material"
import { AccordionStyleChecker } from "~/types"

export interface AccordionItem {
    title: string
    description: string
}
export interface AccordionStyles {
    root?: SxProps
    accordion?: SxProps
    active?: SxProps
    inactive?: SxProps
    summary?: SxProps
    titleActive?: SxProps
    titleInactive?: SxProps
    details?: SxProps
    description?: SxProps
}
export interface AccordionSx {
    withIcon?: AccordionStyles | AccordionStyleChecker
    noIcon?: AccordionStyles
}