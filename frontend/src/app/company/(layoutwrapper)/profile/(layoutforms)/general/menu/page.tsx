import React from 'react'
import EditProfileMenu from '../../../_components/EditProfileMenu'
import { companyEditLinks } from '../../layout'

const page = () => {
  return (
    <main className="flex flex-grow">
      <EditProfileMenu type="companies" editLinks={companyEditLinks} />
    </main>
  )
}

export default page