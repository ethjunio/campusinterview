import React from 'react'
import EditProfileMenu from '../../../_components/EditProfileMenu'
import { candidateEditLinks } from '../../layout'

const page = () => {
  return (
    <main className="flex flex-grow">
      <EditProfileMenu type="candidate" editLinks={candidateEditLinks} />
    </main>
  )
}

export default page