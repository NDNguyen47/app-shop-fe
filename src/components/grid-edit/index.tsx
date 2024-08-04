
// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import Icon from 'src/components/Icon'
import { IconButton, Tooltip } from '@mui/material'
interface TGridEdit {
    onClick: () => void
    disabled?: boolean
}


const GridEdit = (props: TGridEdit) => {

    // ** props
    const { onClick, disabled } = props
    const { t } = useTranslation()

    return (
        <Tooltip title={t('Edit')}>
            <IconButton onClick={onClick} disabled={disabled}>
                <Icon icon="material-symbols-light:edit-outline" />
            </IconButton>
        </Tooltip>
    )
}

export default GridEdit