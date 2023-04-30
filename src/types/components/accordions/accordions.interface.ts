import { SxProps } from "@mui/material"

export interface AccordionItem {
    title: string
    description: string
}
interface NestedStyles {
    [key: string]: string | number | NestedStyles
}
export interface AccordionSx {
    withIcon: { [key: string]: SxProps | NestedStyles }
    noIcon: { [key: string]: SxProps | NestedStyles }
}