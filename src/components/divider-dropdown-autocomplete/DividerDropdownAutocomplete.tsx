import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { AutocompleteRenderGroupParams } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import AsyncAutocomplete, {
  AsyncAutocompleteProps
} from '~/components/async-autocomplete/AsyncAutocomplete'

import { styles } from '~/containers/my-courses/course-toolbar/CourseToolbar.style'

interface DividedDropdownAutocompleteProps<Response, TransformedResponse>
  extends Omit<
    AsyncAutocompleteProps<Response, TransformedResponse, boolean | undefined>,
    'onChange'
  > {
  onChange: (_: SyntheticEvent, value: TransformedResponse | null) => void
}

const DividedDropdownAutocomplete = <Response, TransformedResponse>({
  transform,
  onResponse,
  onResponseError,
  groupBy,
  ...props
}: DividedDropdownAutocompleteProps<Response, TransformedResponse>) => {
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
    <AsyncAutocomplete<Response, TransformedResponse>
      groupBy={groupBy}
      onResponse={onResponse}
      onResponseError={onResponseError}
      renderGroup={optionsList}
      transform={transform}
      {...props}
    />
  )
}

export default DividedDropdownAutocomplete
