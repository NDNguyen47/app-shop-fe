// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import MyProfilePage from 'src/view/pages/my-profile'
import LayoutNotApp from 'src/view/layouts/LayoutNotApp'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <MyProfilePage />
}

export default Index
Index.getLayout = (page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>