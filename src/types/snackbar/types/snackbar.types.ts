import { Draft } from '@reduxjs/toolkit'
import { TOptions } from 'i18next/typescript/options'

export type ExtendedSnackbarMessage = {
  text: string
  options: Draft<TOptions>
}

export type SnackbarMessage = string | ExtendedSnackbarMessage
