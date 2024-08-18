import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Protected({children}) {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    if(!token){
    navigate("/login")
    }
  return (
    <>{children}</>
  )
}
