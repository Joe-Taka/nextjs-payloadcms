import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'
import getUser from './actions/getUser'

interface Props {
  children: ReactNode
}

const Authenticated: FC<Props> = async ({ children }) => {
  const user = await getUser()

  if (!user) {
    redirect('/login')
    return null
  }

  return <div>{children}</div>
}

export default Authenticated
