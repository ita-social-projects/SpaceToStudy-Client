import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AddDocuments from '~/containers/add-documents/AddDocuments'
import AppButton from '~/components/app-button/AppButton'
import EnhancedTable from '~/components/enhanced-table/EnhancedTable'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import { useModalContext } from '~/context/modal-context'
import useSort from '~/hooks/table/use-sort'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'

import {
  columns,
  initialSort,
  removeColumnRules
} from '~/containers/add-attachments/AddAttachments.constants'
import { ajustColumns } from '~/utils/helper-functions'
import { defaultResponses, snackbarVariants } from '~/constants'
import { styles } from '~/containers/add-attachments/AddAttachments.styles'
import {
  Attachment,
  ButtonVariantEnum,
  ErrorResponse,
  ItemsWithCount
} from '~/types'
interface AddAttachmentsProps {
  attachments: Attachment[]
  onAddAttachments: (attachments: Attachment[]) => void
}

const AddAttachments: FC<AddAttachmentsProps> = ({
  attachments = [],
  onAddAttachments
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [selectedAttachments, setSelectedAttachments] =
    useState<Attachment[]>(attachments)

  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const formData = new FormData()

  const breakpoints = useBreakpoints()
  const sortOptions = useSort({
    initialSort
  })
  const { sort } = sortOptions

  const columnsToShow = ajustColumns<Attachment>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const getMyAttachments = useCallback(
    () =>
      ResourceService.getAttachments({
        sort
      }),
    [sort]
  )

  const {
    loading,
    response,
    fetchData: fetchDataAttachments
  } = useAxios<ItemsWithCount<Attachment>>({
    service: getMyAttachments,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputReset = () => {
    setInputValue('')
  }

  const handleRowClick = (item: Attachment) => {
    if (selectedAttachments.find((attachment) => attachment._id === item._id)) {
      setSelectedAttachments((prevSelectedAttachments) =>
        prevSelectedAttachments.filter(
          (attachment) => attachment._id !== item._id
        )
      )
    } else {
      setSelectedAttachments((prevSelectedAttachments) => [
        ...prevSelectedAttachments,
        item
      ])
    }
  }

  const handleAddAttachments = () => {
    onAddAttachments(selectedAttachments)
    closeModal()
  }
  const filteredAttachments = useMemo(
    () =>
      response.items.filter((item) => {
        const lowerCaseFileName = item.fileName.toLowerCase()
        const lowerCaseInputValue = inputValue.toLocaleLowerCase()
        const fileNameWithoutExtension = lowerCaseFileName
          .split('.')
          .slice(0, -1)
          .join('.')

        return fileNameWithoutExtension.includes(lowerCaseInputValue)
      }),
    [response.items, inputValue]
  )

  const createAttachments = useCallback(
    (data?: FormData) => ResourceService.createAttachments(data),
    []
  )

  const onCreateAttachmentsError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }
  const { fetchData: fetchCreateAttachment } = useAxios({
    service: createAttachments,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onCreateAttachmentsError
  })

  const uploadFile = async (data: FormData) => {
    await fetchCreateAttachment(data)
    await fetchDataAttachments()
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('myResourcesPage.attachments.addFromAttachments')}
      </Typography>
      <InputWithIcon
        endAdornment={<SearchIcon sx={styles.searchIcon} />}
        onChange={handleInputChange}
        onClear={handleInputReset}
        placeholder={t('common.search')}
        sx={styles.input}
        value={inputValue}
      />
      <Box sx={styles.tableWrapper}>
        <EnhancedTable
          columns={columnsToShow}
          data={{ loading, items: filteredAttachments }}
          emptyTableKey='myResourcesPage.attachments.emptyAttachments'
          onRowClick={handleRowClick}
          selectedRows={selectedAttachments}
          sort={sortOptions}
          sx={styles.table}
        />
      </Box>

      <Box sx={styles.buttonsArea}>
        <Box>
          <AppButton
            disabled={!selectedAttachments.length}
            onClick={handleAddAttachments}
            sx={styles.addButton}
          >
            {t('common.add')}
          </AppButton>
          <AppButton onClick={closeModal} variant={ButtonVariantEnum.Tonal}>
            {t('common.cancel')}
          </AppButton>
        </Box>

        <AddDocuments
          buttonText={t('common.uploadNewFile')}
          fetchData={uploadFile}
          formData={formData}
        />
      </Box>
    </Box>
  )
}

export default AddAttachments
