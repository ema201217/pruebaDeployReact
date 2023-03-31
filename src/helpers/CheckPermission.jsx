import React from 'react'
import { Navigate } from 'react-router-dom'

export const CheckPermission = ({children, hasPermission, redirect = '/'}) => {

  if(hasPermission){
    return children
  }
  return <Navigate to={redirect}/>

}
