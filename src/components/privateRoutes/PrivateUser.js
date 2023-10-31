import React from 'react'
import { userInfo } from '../../utils/auth'
import { Navigate, Outlet } from 'react-router'

const PrivateUser = () => {
    return (
        userInfo().role ==="user"? <Outlet /> : <Navigate to="/login" />
      )
}

export default PrivateUser