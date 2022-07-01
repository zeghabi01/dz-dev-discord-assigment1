import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthSystem } from './AuthSystem'


function PrivateRoute() {

  const {token} = useAuthSystem()

  if(token) return <Outlet />

  return <Navigate to={'/login'} />
 
}

export default PrivateRoute