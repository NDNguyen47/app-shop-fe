// ** Import Next
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'

// ** pages
import RoleListPage from 'src/view/pages/system/role/RoleList'

// ** views

type TProps = {}

const Index: NextPage<TProps> = () => {
  return <RoleListPage />
}

Index.permission = [PERMISSIONS.SYSTEM.ROLE.VIEW]
export default Index