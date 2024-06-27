
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/view/layouts/BlankLayout'
import LoginPage from 'src/view/pages/login'

type Tprops = {}

const Login: NextPage<Tprops> = () => {
    return (
        <h1><LoginPage/></h1>
    )
}

export default Login

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true


