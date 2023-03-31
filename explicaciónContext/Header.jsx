import { useContext } from 'react'
import { MsgContext } from './contexts/msgContext'

export const Header = () => {
  const {loading} = useContext(MsgContext)
  return (
    <div>{loading.toString()}</div>
  )
}
