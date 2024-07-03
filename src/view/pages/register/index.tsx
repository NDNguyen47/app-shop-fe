// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** React
import { useEffect, useState } from 'react'

// ** Mui
import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Typography,
    useTheme
} from '@mui/material'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import { useDispatch, useSelector } from 'react-redux'
import { registerAuthAsync } from 'src/stores/apps/auth/action'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/apps/auth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {}

type TDefaultValue = {
    email: string
    password: string
    confirmPassword: string
}

const RegisterPage: NextPage<TProps> = () => {
    // State
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // ** router
    const router = useRouter()

    /// ** redux
    const dispatch: AppDispatch = useDispatch()
    const { isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth)

    // ** theme
    const theme = useTheme()

    const schema = yup.object().shape({
        email: yup.string().required('The field is required').matches(EMAIL_REG, 'The field is must email type'),
        password: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain charactor, special character, number'),
        confirmPassword: yup
            .string()
            .required('The field is required')
            .matches(PASSWORD_REG, 'The password is contain charactor, special character, number')
            .oneOf([yup.ref('password'), ''], 'The confirm is must match with password')
    })

    const defaultValues: TDefaultValue = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: { email: string; password: string }) => {
        dispatch(registerAuthAsync({ email: data.email, password: data.password }))
    }

    useEffect(() => {
        if (message) {
            if (isError) {
                toast.error(message)
            } else if (isSuccess) {
                toast.success(message)
                router.push(ROUTE_CONFIG.LOGIN)
            }
            dispatch(resetInitialState())
        }
    }, [isError, isSuccess, message])

    return (
        <>
            {isLoading && <FallbackSpinner />}
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '40px'
                }}
            >
                <Box
                    display={{
                        xs: 'none',
                        sm: 'flex'
                    }}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: theme.palette.customColors.bodyBg,
                        height: '100%',
                        minWidth: '50vw'
                    }}
                >
                    <Image
                        src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
                        alt='login image'
                        style={{
                            height: 'auto',
                            width: 'auto'
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Typography component='h1' variant='h5'>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                            <Box sx={{ mt: 2, width: '300px' }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            autoFocus
                                            fullWidth
                                            label='Email'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder='Input email'
                                            error={Boolean(errors?.email)}
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    name='email'
                                />
                            </Box>

                            <Box sx={{ mt: 2, width: '300px' }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            autoFocus
                                            label='Password'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder='Input password'
                                            error={Boolean(errors?.password)}
                                            helperText={errors?.password?.message}
                                            type={showPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? (
                                                                <Icon icon='material-symbols:visibility-outline' />
                                                            ) : (
                                                                <Icon icon='ic:outline-visibility-off' />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                    name='password'
                                />
                            </Box>

                            <Box sx={{ mt: 2, width: '300px' }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <CustomTextField
                                            required
                                            fullWidth
                                            autoFocus
                                            label='Confirm password'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder='Enter confirm password'
                                            error={Boolean(errors?.confirmPassword)}
                                            helperText={errors?.confirmPassword?.message}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                            {showConfirmPassword ? (
                                                                <Icon icon='material-symbols:visibility-outline' />
                                                            ) : (
                                                                <Icon icon='ic:outline-visibility-off' />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                    name='confirmPassword'
                                />
                            </Box>

                            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                                Register
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                <Typography>{'Do you have already account?'}</Typography>
                                <Link
                                    href='/login'
                                    style={{
                                        color: theme.palette.primary.main
                                    }}
                                >
                                    {'Login'}
                                </Link>
                            </Box>
                            <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>Or</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <IconButton sx={{ color: '#497ce2' }}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        role='img'
                                        fontSize='1.375rem'
                                        className='iconify iconify--mdi'
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                                        ></path>
                                    </svg>
                                </IconButton>
                                <IconButton sx={{ color: theme.palette.error.main }}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        role='img'
                                        fontSize='1.375rem'
                                        className='iconify iconify--mdi'
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                                        ></path>
                                    </svg>
                                </IconButton>
                                <IconButton sx={{ color: theme.palette.error.main }}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        role='img'
                                        fontSize='1.375rem'
                                        className='iconify iconify--mdi'
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                                        ></path>
                                    </svg>
                                </IconButton>
                                <IconButton sx={{ color: theme.palette.customColors.dark }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true" role="img" font-size="1.375rem" className="iconify iconify--mdi" width="1em"
                                        height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                                    </svg>

                                </IconButton>
                                <IconButton sx={{ color: theme.palette.error.main }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                                        <g fill="none">
                                            <rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60" />
                                            <rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60" />
                                            <path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334" />
                                            <defs>
                                                <radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#fd5" />
                                                    <stop offset=".1" stop-color="#fd5" />
                                                    <stop offset=".5" stop-color="#ff543e" />
                                                    <stop offset="1" stop-color="#c837ab" />
                                                </radialGradient>
                                                <radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#3771c8" />
                                                    <stop offset=".128" stop-color="#3771c8" />
                                                    <stop offset="1" stop-color="#60f" stop-opacity="0" />
                                                </radialGradient>
                                            </defs>
                                        </g>
                                    </svg>
                                </IconButton>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RegisterPage