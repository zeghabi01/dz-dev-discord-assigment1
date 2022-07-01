import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthSystem } from './AuthSystem'

function PublicRoute() {

  const {token} = useAuthSystem()

  if(token) return <Navigate to={'/'} />

  return <Outlet />

}

export default PublicRoute