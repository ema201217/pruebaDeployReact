import React from 'react'
import { Navigate } from 'react-router-dom'

export const RoutesPrivate = ({children, user}) => {

  if(!user.id){
    return <Navigate to='/login'/>
  }

  return children
}
