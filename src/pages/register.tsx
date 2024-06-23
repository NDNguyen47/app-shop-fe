
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/view/layouts/BlankLayout'
import RegisterPage from 'src/view/pages/register'

type Tprops = {}

const Register: NextPage<Tprops> = () => {
    return (
        <RegisterPage/>
    )
}

export default Register

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>


