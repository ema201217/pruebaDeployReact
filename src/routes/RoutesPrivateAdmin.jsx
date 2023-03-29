import { Navigate } from 'react-router-dom'

export const RoutesPrivateAdmin = ({children, user}) => {

  if(user.rol !== "ADMIN"){
    return <Navigate to='/home'/>
  }

  return children
}