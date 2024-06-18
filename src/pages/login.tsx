
import { NextPage } from 'next'
import LoginPage from 'src/view/pages/login'

type Tprops = {}

const Login: NextPage<Tprops> = () => {
    return (
        <h1><LoginPage/></h1>
    )
}

export default Login


