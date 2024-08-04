
// ** React
import React from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import Icon from 'src/components/Icon'
import { IconButton, Tooltip, useTheme } from '@mui/material'

interface TGridCreate {
    onClick: () => void
    disabled?: boolean
}


const GridCreate = (props: TGridCreate) => {

    // ** props
    const { onClick, disabled } = props

    // ** translation
    const { t } = useTranslation()

    // ** theme
    const theme = useTheme()

    return (
        <Tooltip title={t('Create')}>
            <IconButton onClick={onClick} disabled={disabled} sx={{ backgroundColor: `${theme.palette.primary.main} !important`, color: `${theme.palette.common.white}` }}>
                <Icon icon="tabler:plus" />
            </IconButton>
        </Tooltip>
    )
}

export default GridCreate