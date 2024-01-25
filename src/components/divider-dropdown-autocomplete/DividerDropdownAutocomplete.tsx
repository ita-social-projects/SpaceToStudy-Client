import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { AutocompleteRenderGroupParams } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import AsyncAutocomplete, {
  AsyncAutocompleteProps
} from '~/components/async-autocomlete/AsyncAutocomplete'

import { styles } from '~/containers/my-courses/course-toolbar/CourseToolbar.style'

interface DividedDropdownAutocompleteProps<
  Response,
  TransformedResponse,
  Params
> extends Omit<
    AsyncAutocompleteProps<
      Response,
      Params,
      TransformedResponse,
      boolean | undefined
    >,
    'onChange'
  > {
  onChange: (_: SyntheticEvent, value: TransformedResponse | null) => void
}

const DividedDropdownAutocomplete = <
  Response,
  TransformedResponse,
  Params = undefined
>({
  axiosProps,
  groupBy,
  ...props
}: DividedDropdownAutocompleteProps<Response, TransformedResponse, Params>) => {
  const { t } = useTranslation()

  const optionsList = ({
    group,
    key,
    children,
    ...props
  }: AutocompleteRenderGroupParams) => (
    <Box key={key} {...props}>
      {Number(key) > 0 && <Divider sx={styles.autocompleteDropdownDivider} />}
      <Typography sx={styles.autocompleteDropdownTitle}>{t(group)}</Typography>
      {children}
    </Box>
  )

  return (
    <AsyncAutocomplete<Response, Params, TransformedResponse>
      axiosProps={axiosProps}
      groupBy={groupBy}
      renderGroup={optionsList}
      {...props}
    />
  )
}

export default DividedDropdownAutocomplete
