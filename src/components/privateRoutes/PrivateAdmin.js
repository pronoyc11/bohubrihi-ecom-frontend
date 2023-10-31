import React from 'react'
import { userInfo } from '../../utils/auth'
import { Navigate, Outlet } from 'react-router'

const PrivateAdmin = () => {
  return (
    userInfo().role ==="admin"? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateAdmin