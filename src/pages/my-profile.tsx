
import { NextPage } from 'next'
import { ReactNode } from 'react'
import BlankLayout from 'src/view/layouts/BlankLayout'
import RegisterPage from 'src/view/pages/register'

type Tprops = {}

const Index: NextPage<Tprops> = () => {
    return (
        <RegisterPage/>
    )
}

export default Index



