import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'

interface ScreenProps {
  children: React.ReactNode
  title?: string
  contentClassName?: string
  redirectIfGuest?: boolean
  redirectIfAuthenticated?: boolean
}

const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  contentClassName,
  redirectIfGuest,
  redirectIfAuthenticated
}) => {
  const navigate = useNavigate()
  const authToken = useMemo(() => localStorage.getItem('token'), [])

  useEffect(() => {
    if (title) document.title = title
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
      {title && <h2 className="text-2xl p-2 font-bold">{title}</h2>}
      <section className={contentClassName}>{children}</section>
    </>
  )
}

export default Screen
