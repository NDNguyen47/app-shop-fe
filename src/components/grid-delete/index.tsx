
// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import Icon from 'src/components/Icon'
import { IconButton, Tooltip } from '@mui/material'
interface TGridDelete {
    onClick: () => void
    disabled?: boolean
 }


const GridDelete = (props: TGridDelete) => {
    const { onClick, disabled } = props
    const { t } = useTranslation()

    return (
        <Tooltip title={t('Delete')}>
            <IconButton onClick={onClick} disabled={disabled}>
                <Icon icon="material-symbols-light:delete-outline" />
            </IconButton>
        </Tooltip>
    )
}

export default GridDelete