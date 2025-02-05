import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'

interface ScreenProps {
  children: React.ReactNode
  title: string
  redirectIfGuest?: boolean
  redirectIfAuthenticated?: boolean
}

const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  redirectIfGuest,
  redirectIfAuthenticated
}) => {
  const navigate = useNavigate()
  const authToken = useMemo(() => localStorage.getItem('token'), [])

  useEffect(() => {
    document.title = title
    if (!authToken && redirectIfGuest) {
      navigate('/login')
    } else if (authToken && redirectIfAuthenticated) {
      navigate('/dashboard')
    }
  }, [authToken])

  if (
    (!authToken && redirectIfGuest) ||
    (authToken && redirectIfAuthenticated)
  ) {
    return null
  }

  return (
    <>
      <h2 className="p-2 text-2xl font-bold">{title}</h2>
      <section className="p-2">{children}</section>
    </>
  )
}

export default Screen
